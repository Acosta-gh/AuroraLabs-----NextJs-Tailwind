"use client"

import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { getPlans } from '@/lib/pocketbase';
import { useTranslation } from '@/hooks/useTranslation';
import { useCurrency } from '@/hooks/useCurrency';


// ─── Configuración del cache ──────────────────────────────────────────────────

const CACHE_KEY = 'plans_cache';
const CACHE_TTL = 1000 * 60 * 60; // 1 hora


// ─── Helpers de cache ─────────────────────────────────────────────────────────

function readCacheFromStorage() {
    try {
        const raw = sessionStorage.getItem(CACHE_KEY);
        if (!raw) return null;

        const entry = JSON.parse(raw);
        const isExpired = Date.now() - entry.timestamp >= CACHE_TTL;

        return isExpired ? null : entry;
    } catch {
        return null;
    }
}

function writeCacheToStorage(entry) {
    try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(entry));
    } catch { }
}


// ─── Transformación de un plan crudo → plan listo para usar ──────────────────

/**
 * Toma un plan de PocketBase (números y flags) y le agrega
 * los textos del idioma activo (nombre, features, CTA, etc.)
 * usando el `slug` como clave en las traducciones.
 *
 * Ejemplo de entrada (PocketBase):
 *   { slug: "presencia", price_ars: 80000, price_usd: 80, on_sale: false, ... }
 *
 * Ejemplo de salida:
 *   { slug, id, name, tagline, price: { ARS, USD }, features: [...], ... }
 */
function mergePlanWithTranslations(rawPlan, t) {
    const key = rawPlan.slug; // ej: "presencia", "empresa", "eCatalog"

    // Textos del idioma activo para este plan
    const name = t(`pricing.plans.${key}.name`);
    const tagline = t(`pricing.plans.${key}.tagline`);
    const cta = t(`pricing.plans.${key}.cta`);
    const whatsappMessage = t(`pricing.plans.${key}.whatsappMessage`);

    // Features: probamos hasta el índice 6 y descartamos las que no tienen traducción
    const features = [0, 1, 2, 3, 4, 5, 6]
        .map(i => t(`pricing.plans.${key}.features.${i}`))
        .filter(val => !val.includes('features.'));

    // Cosas no incluidas
    const notIncluded = [0, 1, 2, 3, 4, 5, 6]
        .map(i => t(`pricing.plans.${key}.notIncluded.${i}`))
        .filter(val => !val.includes('notIncluded.'));

    // Detalle del modal
    const details = {
        description: t(`pricing.plans.${key}.details.description`),
        deliveryTime: t(`pricing.plans.${key}.details.deliveryTime`),

        idealFor: [0, 1, 2]
            .map(i => t(`pricing.plans.${key}.details.idealFor.${i}`))
            .filter(val => !val.includes('idealFor.')),

        includes: [0, 1, 2, 3]
            .map(i => ({
                title: t(`pricing.plans.${key}.details.includes.${i}.title`),
                description: t(`pricing.plans.${key}.details.includes.${i}.description`),
            }))
            .filter(item => !item.title.includes('includes.')),
    };

    // Precios estructurados igual que antes para no romper nada
    const price = {
        ARS: rawPlan.price_ars,
        USD: rawPlan.price_usd,
    };

    const monthly = {
        ARS: rawPlan.monthly_ars,
        USD: rawPlan.monthly_usd,
    };

    // Solo existe si hay precio original (plan en oferta)
    const originalPrice = (rawPlan.original_price_ars || rawPlan.original_price_usd)
        ? { ARS: rawPlan.original_price_ars, USD: rawPlan.original_price_usd }
        : null;

    return {
        // Identificadores
        id: rawPlan.id,
        slug: rawPlan.slug,

        // Textos del idioma activo
        name,
        tagline,
        cta,
        whatsappMessage,
        features,
        notIncluded,
        details,

        // Precios desde PocketBase
        price,
        monthly,
        originalPrice,

        // Flags desde PocketBase
        onSale: rawPlan.on_sale,
        disabled: rawPlan.disabled,
        popular: rawPlan.popular,
        visible: rawPlan.visible,
        order: rawPlan.order,

        // Descuento ya calculado por el backend
        discountPercentage: rawPlan.discount_percent ?? null,

        // Variant para el botón (shadcn)
        variant: rawPlan.popular ? 'default' : 'outline',
    };
}


// ─── Contexto ─────────────────────────────────────────────────────────────────

const PlansContext = createContext(null);

export function ServicesProvider({ children }) {
    const cacheRef = useRef(null);

    // rawPlans: datos crudos de PocketBase (sin textos)
    const [rawPlans, setRawPlans] = useState([]);
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation();
    const { currency } = useCurrency();

    // ── Fetch de PocketBase (solo una vez, con cache) ──────────────────────────
    useEffect(() => {
        cacheRef.current = readCacheFromStorage();

        console.log("cache:", cacheRef.current);

        // Cache hit → usamos lo guardado sin fetch
        if (cacheRef.current) {
            setRawPlans(cacheRef.current.items);
            setLoading(false);
            return;
        }

        // Cache miss → pedimos a PocketBase
        let cancelled = false;

        async function fetchPlans() {
            try {
                setLoading(true);
                const res = await getPlans();
                if (cancelled || !res) return;

                const newEntry = { items: res, timestamp: Date.now() };
                cacheRef.current = newEntry;
                writeCacheToStorage(newEntry);

                setRawPlans(res);
            } catch (error) {
                if (!cancelled) console.error('Error al obtener planes:', error);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchPlans();
        return () => { cancelled = true; };

    }, []); // Solo al montar — los textos se re-calculan abajo

    // ── Combinar datos crudos + traducciones del idioma activo ─────────────────
    //
    // Cada vez que cambia el idioma (o llegan los datos), recalculamos los planes
    // combinados. Como rawPlans son los datos puros sin texto, no hay que volver
    // a hacer fetch: solo re-transformamos lo que ya tenemos.
    const plans = rawPlans
        .sort((a, b) => a.order - b.order)               // respetamos el orden del CMS
        .map(rawPlan => mergePlanWithTranslations(rawPlan, t));

    return (
        <PlansContext.Provider value={{ plans, loading, currency }}>
            {children}
        </PlansContext.Provider>
    );
}

export function useServices() {
    const ctx = useContext(PlansContext);
    if (!ctx) throw new Error('useServices debe usarse dentro de <ServicesProvider>');
    return ctx;
}