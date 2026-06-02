"use client"

import { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';
import { getPlans } from '@/lib/pocketbase';
import { useTranslation } from '@/hooks/useTranslation';
import { useCurrency } from '@/hooks/useCurrency';
import { PLAN_PRICES } from '@/constants/plans';

const CACHE_KEY = 'plans_cache';
const CACHE_VERSION = 'v1.1';
const CACHE_TTL = 1000 * 60 * 60 * 24;

function readCacheFromStorage() {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;

        const entry = JSON.parse(raw);

        if (entry.version !== CACHE_VERSION) return null;

        const isExpired = Date.now() - entry.timestamp >= CACHE_TTL;
        if (isExpired) return null;

        if (!Array.isArray(entry.items)) return null;

        const isValidStructure = entry.items.every(item =>
            item && typeof item === 'object' && 'price_ars' in item && 'price_usd' in item
        );

        return isValidStructure ? entry : null;
    } catch {
        return null;
    }
}

function writeCacheToStorage(entry) {
    try {
        entry.version = CACHE_VERSION;
        localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
    } catch { }
}

const FALLBACK_SLUGS = ['presencia', 'empresa', 'eCatalog', 'ecommerce', 'custom'];

function getFallbackRawPlans() {
    return FALLBACK_SLUGS.map((slug, i) => {
        const p = PLAN_PRICES[slug] || {};
        return {
            id: slug,
            slug,
            price_ars: p.price?.ARS ?? 0,
            price_usd: p.price?.USD ?? 0,
            monthly_ars: p.monthly?.ARS ?? 0,
            monthly_usd: p.monthly?.USD ?? 0,
            original_price_ars: p.originalPrice?.ARS ?? null,
            original_price_usd: p.originalPrice?.USD ?? null,
            on_sale: p.onSale ?? false,
            disabled: p.disabled ?? false,
            popular: p.popular ?? false,
            visible: true,
            order: i,
            discount_percent: null,
        };
    });
}

function mergePlanWithTranslations(rawPlan, t) {
    const key = rawPlan.slug;

    const name = t(`pricing.plans.${key}.name`);
    const tagline = t(`pricing.plans.${key}.tagline`);
    const cta = t(`pricing.plans.${key}.cta`);
    const whatsappMessage = t(`pricing.plans.${key}.whatsappMessage`);

    const features = [0, 1, 2, 3, 4, 5, 6]
        .map(i => t(`pricing.plans.${key}.features.${i}`))
        .filter(val => !val.includes('features.'));

    const notIncluded = [0, 1, 2, 3, 4, 5, 6]
        .map(i => t(`pricing.plans.${key}.notIncluded.${i}`))
        .filter(val => !val.includes('notIncluded.'));

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

    const price = { ARS: rawPlan.price_ars, USD: rawPlan.price_usd };
    const monthly = { ARS: rawPlan.monthly_ars, USD: rawPlan.monthly_usd };
    const originalPrice = (rawPlan.original_price_ars || rawPlan.original_price_usd)
        ? { ARS: rawPlan.original_price_ars, USD: rawPlan.original_price_usd }
        : null;

    return {
        id: rawPlan.id,
        slug: rawPlan.slug,
        name, tagline, cta, whatsappMessage,
        features, notIncluded,
        details,
        price, monthly, originalPrice,
        onSale: rawPlan.on_sale,
        disabled: rawPlan.disabled,
        popular: rawPlan.popular,
        visible: rawPlan.visible,
        order: rawPlan.order,
        discountPercentage: rawPlan.discount_percent ?? null,
        variant: rawPlan.popular ? 'default' : 'outline',
    };
}

const PlansContext = createContext(null);

export function ServicesProvider({ children }) {
    const cacheRef = useRef(null);

    const [rawPlans, setRawPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { t } = useTranslation();
    const { currency } = useCurrency();

    useEffect(() => {
        cacheRef.current = readCacheFromStorage();

        if (cacheRef.current) {
            setRawPlans(cacheRef.current.items);
            setLoading(false);
            return;
        }

        let cancelled = false;

        async function fetchPlans() {
            try {
                setLoading(true);
                setError(null);
                const res = await getPlans();

                if (cancelled) return;

                if (!res || !Array.isArray(res)) {
                    throw new Error("Datos incompletos desde PocketBase");
                }

                const newEntry = { items: res, timestamp: Date.now() };
                cacheRef.current = newEntry;
                writeCacheToStorage(newEntry);

                setRawPlans(res);
            } catch (error) {
                if (!cancelled) {
                    console.error('Error al obtener planes:', error);
                    setError(error);
                    setRawPlans(getFallbackRawPlans());
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchPlans();
        return () => { cancelled = true; };

    }, []);

    const plans = useMemo(() =>
        (rawPlans || [])
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map(rawPlan => mergePlanWithTranslations(rawPlan, t)),
        [rawPlans, t]
    );

    return (
        <PlansContext.Provider value={{ plans, loading, error, currency }}>
            {children}
        </PlansContext.Provider>
    );
}

export function useServices() {
    const ctx = useContext(PlansContext);
    if (!ctx) throw new Error('useServices debe usarse dentro de <ServicesProvider>');
    return ctx;
}
