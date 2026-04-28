"use client";

import { useState } from 'react';
import Link from "next/link";
import { Button } from '@/components/ui/button';
import { Check, X, Info, Zap, ArrowLeft } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCurrency } from "@/hooks/useCurrency";
import { useTranslation } from "@/hooks/useTranslation";

// Contexto de planes dinámicos (PocketBase)
import { useServices } from "@/contexts/PlansContext";

// Skeleton que imita la forma de las cards
import { PricingSkeletonGrid } from "@/components/ui/PricingSkeletonCard";

import { formatPrice, calculateDiscount } from '@/lib/priceHelper';


// ─── Constante ────────────────────────────────────────────────────────────────

const WHATSAPP_PHONE = "5492926501348";

// En la home solo mostramos los primeros 3 planes
const VISIBLE_COUNT = 3;


// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Arma el link de WhatsApp con el mensaje pre-cargado */
function whatsappLink(message) {
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message ?? '')}`;
}


// ─── Subcomponente: precio con o sin oferta ───────────────────────────────────

function PriceDisplay({ plan, currency }) {
    console.log(plan);
    const isOnSale = plan.onSale;
    const { t } = useTranslation();

    const fmt = (priceObj) => formatPrice(priceObj, currency, "Consultar");
    const monthlyText = formatPrice(plan.monthly, currency, null);

    if (isOnSale) {
        return (
            <div className="space-y-2">
                {/* Precio original tachado */}
                <div className="text-xl text-muted-foreground line-through decoration-2 decoration-red-500">
                    {fmt(plan.originalPrice)}
                </div>
                {/* Precio con descuento */}
                <div>
                    <span className="text-4xl font-bold text-green-700">
                        {fmt(plan.price)}
                    </span>
                    {monthlyText && (
                        <div className="text-sm text-muted-foreground mt-1">
                            + {monthlyText}{t('pricing.perMonth')}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <>
            <span className="text-4xl font-bold text-foreground">
                {fmt(plan.originalPrice)}
            </span>
            {monthlyText && (
                <span className="text-muted-foreground ml-1">
                    + {monthlyText}{t('pricing.perMonth')}
                </span>
            )}
        </>
    );
}


// ─── Componente principal ─────────────────────────────────────────────────────

function Pricing() {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Datos dinámicos desde PocketBase (con cache)
    const { plans, loading, error } = useServices();
    const { currency } = useCurrency();
    const { t } = useTranslation();

    // En la home solo mostramos los primeros N planes
    const visiblePlans = (plans || []).slice(0, VISIBLE_COUNT);

    function handleOpenModal(plan) {
        setSelectedPlan(plan);
        setIsModalOpen(true);
    }

    return (
        <section id="services" className="py-20 lg:py-28 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative">
                <div className="max-w-6xl mx-auto">

                    {/* Título de sección */}
                    <Fade triggerOnce direction="up">
                        <div className="text-center space-y-4 mb-16">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                                {t('pricing.title')}
                            </h2>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                                {t('pricing.subtitle')}
                            </p>
                        </div>
                    </Fade>

                    {/* Grid: skeleton mientras carga, cards cuando termina */}
                    <Fade triggerOnce cascade damping={0.1} delay={400}>
                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            {loading ? (
                                <PricingSkeletonGrid count={VISIBLE_COUNT} />
                            ) : (
                                visiblePlans.map((plan, index) => {
                                    const discount = calculateDiscount(
                                        plan.originalPrice,
                                        plan.price,
                                        currency
                                    );
                                    const discountPercentage = discount || plan.discountPercentage;

                                    return (
                                        <div
                                            key={plan.id ?? index}
                                            className={`relative bg-background rounded-xl border transition-all overflow-hidden
                                                ${plan.disabled
                                                    ? 'opacity-60 cursor-not-allowed border-border/30 grayscale-[50%]'
                                                    : plan.popular
                                                        ? 'border-primary shadow-md scale-105 md:scale-105 hover:shadow-lg'
                                                        : 'border-border/50 hover:border-border hover:shadow-lg'
                                                }`}
                                        >
                                            {/* Overlay "Próximamente" para planes deshabilitados */}
                                            {plan.disabled && (
                                                <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] rounded-xl z-10 flex items-start justify-end p-4">
                                                    <span className="bg-muted/90 text-muted-foreground text-xs font-semibold px-4 py-2 rounded-full border border-border shadow-sm">
                                                        {t('pricing.comingSoon')}
                                                    </span>
                                                </div>
                                            )}

                                            {/* Badge "Más popular" */}
                                            {plan.popular && !plan.disabled && (
                                                <div className="absolute top-0 left-0 right-0 flex justify-center pt-4 z-20">
                                                    <span className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                                                        {t('pricing.mostPopular')}
                                                    </span>
                                                </div>
                                            )}

                                            {/* Cinta de descuento diagonal */}
                                            {plan.onSale && !plan.disabled && (
                                                <div className="absolute transform rotate-45 bg-green-600 text-center text-white font-semibold py-1 right-[-35px] top-[32px] w-[170px] shadow-lg z-10">
                                                    {discountPercentage}% OFF
                                                </div>
                                            )}

                                            {/* Cabecera: nombre, tagline, precio */}
                                            <div className={`text-center mb-6 pb-6 border-b border-border/50 px-8 ${plan.popular && !plan.disabled ? 'pt-16' : 'pt-8'}`}>
                                                <h3 className="font-bold text-2xl mb-2">{plan.name}</h3>
                                                <p className="text-sm text-muted-foreground mb-4">{plan.tagline}</p>

                                                <div className="mb-2">
                                                    <PriceDisplay plan={plan} currency={currency} />
                                                </div>

                                                {/* Badge de oferta limitada */}
                                                {plan.onSale && (
                                                    <div className="mt-3">
                                                        <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-200">
                                                            <Zap className="h-3 w-3 fill-current" />
                                                            {t('pricing.limitedOffer')}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Features incluidas */}
                                            <div className="space-y-4 mb-8 px-8">
                                                <ul className="space-y-3">
                                                    {(plan.features ?? []).map((feature, i) => (
                                                        <li key={i} className="flex items-start gap-3 text-sm">
                                                            <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                                            <span className="text-foreground">{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>

                                                {/* Features NO incluidas */}
                                                {(plan.notIncluded?.length > 0) && (
                                                    <ul className="space-y-3 pt-4 border-t border-border/30">
                                                        {plan.notIncluded.map((item, i) => (
                                                            <li key={i} className="flex items-start gap-3 text-sm">
                                                                <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                                                                <span className="text-muted-foreground">{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>

                                            {/* Botones */}
                                            <div className="px-8 pb-8">
                                                <a
                                                    href={whatsappLink(plan.whatsappMessage)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Button
                                                        size="lg"
                                                        variant={plan.popular ? "default" : "outline"}
                                                        className="w-full group"
                                                        disabled={plan.disabled}
                                                    >
                                                        <FaWhatsapp className="h-4 w-4" />
                                                        {plan.cta}
                                                    </Button>
                                                </a>
                                                <Button
                                                    size="lg"
                                                    variant="ghost"
                                                    disabled={plan.disabled}
                                                    className="w-full group mt-3 flex justify-center"
                                                    onClick={() => handleOpenModal(plan)}
                                                >
                                                    <Info className="mr-2 h-4 w-4" />
                                                    {t('pricing.viewDetails')}
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </Fade>

                </div>
            </div>

            {/* Modal de detalle del plan seleccionado */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-2xl w-[95vw] max-h-[85vh] overflow-y-auto mx-auto">
                    {selectedPlan && (
                        <>

                            {/* Botón volver */}
                            <div className="flex justify-left">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-muted-foreground hover:text-foreground"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> {t('backToHome') ?? 'Volver'}
                                </Button>
                            </div>

                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold flex items-center gap-2 flex-wrap">
                                    {selectedPlan.name}

                                    {selectedPlan.popular && (
                                        <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                                            {t('pricing.mostPopular')}
                                        </span>
                                    )}

                                    {selectedPlan.onSale && (
                                        <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                            <Zap className="h-3 w-3 fill-current" />
                                            {calculateDiscount(selectedPlan.originalPrice, selectedPlan.price, currency)
                                                ? `${calculateDiscount(selectedPlan.originalPrice, selectedPlan.price, currency)}% OFF`
                                                : 'OFERTA'
                                            }
                                        </span>
                                    )}
                                </DialogTitle>
                                <DialogDescription className="text-base">
                                    {selectedPlan.details?.description}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-6 mt-4">

                                {/* Precio en el modal */}
                                <div className={`rounded-lg p-4 text-center border ${selectedPlan.onSale ? 'bg-gradient-to-br from-green-50 to-green-50 border-green-200' : 'bg-muted/50 border-border/50'}`}>
                                    <PriceDisplay plan={selectedPlan} currency={currency} />

                                    {/* Cuánto ahorrás */}
                                    {selectedPlan.onSale && selectedPlan.originalPrice && selectedPlan.price && selectedPlan.originalPrice[currency] && selectedPlan.price[currency] && (
                                        <div className="pt-2 mt-2">
                                            <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-200">
                                                <Zap className="h-3 w-3 fill-current" />
                                                {t('pricing.saved')} {currency === "ARS"
                                                    ? `$${(selectedPlan.originalPrice.ARS - selectedPlan.price.ARS).toLocaleString("es-AR")}`
                                                    : `$${(selectedPlan.originalPrice.USD - selectedPlan.price.USD).toLocaleString("en-US")}`
                                                }!
                                            </span>
                                        </div>
                                    )}

                                    <div className="text-xs text-muted-foreground mt-2">
                                        {t('pricing.deliveryTime')}: <span className="font-semibold text-foreground">{selectedPlan.details?.deliveryTime}</span>
                                    </div>
                                </div>

                                {/* Qué incluye en detalle */}
                                {selectedPlan.details?.includes?.length > 0 && (
                                    <div>
                                        <h4 className="font-semibold text-lg mb-3">{t('pricing.whatIncludes')}</h4>
                                        <div className="space-y-4">
                                            {selectedPlan.details.includes.map((item, i) => (
                                                <div key={i} className="border-l-2 border-primary pl-4">
                                                    <h5 className="font-semibold text-sm mb-1">{item.title}</h5>
                                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Ideal para */}
                                {selectedPlan.details?.idealFor?.length > 0 && (
                                    <div>
                                        <h4 className="font-semibold text-lg mb-3">{t('pricing.idealFor')}</h4>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {selectedPlan.details.idealFor.map((item, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm">
                                                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* CTA en el modal */}
                                <div className="pt-4 border-t">
                                    <a
                                        href={whatsappLink(selectedPlan.whatsappMessage)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button size="lg" className="w-full group" disabled={selectedPlan.disabled}>
                                            <FaWhatsapp className="h-4 w-4" />
                                            {selectedPlan.cta}
                                        </Button>
                                    </a>
                                </div>

                                {/* Nota al pie */}
                                <div className="bg-background rounded-xl p-6 border border-border/50 text-center max-w-3xl mx-auto">
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        <strong className="text-foreground">{t('pricing.importantNote')}</strong> {t('pricing.noteText')}
                                    </p>
                                </div>

                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* Link para ver todos los planes */}
            <div className="flex justify-center mt-10">
                <Link href="/more-tiers">
                    <Button variant="outline" className="p-4">
                        {t('pricing.viewMorePlans')}
                    </Button>
                </Link>
            </div>
        </section>
    );
}

export default Pricing;