"use client"
export const runtime = 'edge';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check, Zap, ArrowLeft, Minus } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useServices } from "@/contexts/PlansContext";
import { useCurrency } from "@/hooks/useCurrency";
import { useTranslation } from "@/hooks/useTranslation";
import { formatPrice, calculateDiscount } from "@/lib/priceHelper";
import { PricingSkeletonGrid } from "@/components/ui/PricingSkeletonCard";

const WHATSAPP_PHONE = "5492926501348";

function whatsappLink(message) {
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message ?? "")}`;
}

function PriceDisplay({ plan, currency }) {
    const { t } = useTranslation();
    const isOnSale = plan.onSale;
    const fmt = (priceObj) => formatPrice(priceObj, currency, "Consultar");
    const monthlyText = formatPrice(plan.monthly, currency, null);

    if (isOnSale) {
        return (
            <div className="space-y-2">
                <div className="text-lg text-muted-foreground line-through decoration-2 decoration-red-400">
                    {fmt(plan.originalPrice)}
                </div>
                <div>
                    <span className="text-4xl font-bold text-green-700">
                        {fmt(plan.price)}
                    </span>
                    {monthlyText && (
                        <div className="text-sm text-muted-foreground mt-1">
                            + {monthlyText}{t("pricing.perMonth")}
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
                    + {monthlyText}{t("pricing.perMonth")}
                </span>
            )}
        </>
    );
}

export default function PlanDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params?.slug;
    const { plans, loading } = useServices();
    const { currency } = useCurrency();
    const { t } = useTranslation();

    const plan = plans.find((p) => p.slug === slug) ?? null;

    if (!loading && !plan) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
                <h2 className="text-2xl font-bold">{t("pricing.planNotFound") ?? "Plan no encontrado"}</h2>
                <Button onClick={() => router.back()} variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t("back")}
                </Button>
            </div>
        );
    }

    return (
        <>
            {loading ? (
                <section className="py-20 lg:py-28">
                    <div className="container mx-auto px-6">
                        <div className="max-w-3xl mx-auto">
                            <PricingSkeletonGrid count={1} />
                        </div>
                    </div>
                </section>
            ) : (
                <>
                    {/* ─── Hero ─── */}
                    <section className="relative overflow-hidden border-b border-border/40">
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-transparent to-transparent pointer-events-none" />
                        <div className="container mx-auto px-6 relative py-20 lg:py-28">
                            <div className="max-w-2xl mx-auto">
                                <Link
                                    href="/#services"
                                    className="inline-flex items-center gap-2 text-sm text-muted-foreground/70 hover:text-foreground transition-colors mb-12"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    {t("backToHome")}
                                </Link>

                                <div className="text-center">
                                    {plan.popular && !plan.disabled && (
                                        <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-6">
                                            {t("pricing.mostPopular")}
                                        </span>
                                    )}

                                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{plan.name}</h1>
                                    <p className="text-lg text-muted-foreground leading-relaxed mb-10">{plan.tagline}</p>

                                    <div className="max-w-xs mx-auto mb-6">
                                        <PriceDisplay plan={plan} currency={currency} />

                                        {plan.onSale && plan.originalPrice && plan.price && plan.originalPrice[currency] && plan.price[currency] && (
                                            <div className="mt-4 pt-4 border-t border-border/30">
                                                <span className="inline-flex items-center gap-1.5 text-xs text-green-700 font-medium">
                                                    <Zap className="h-3.5 w-3.5" />
                                                    {t("pricing.saved")}{" "}
                                                    {currency === "ARS"
                                                        ? `$${(plan.originalPrice.ARS - plan.price.ARS).toLocaleString("es-AR")}`
                                                        : `$${(plan.originalPrice.USD - plan.price.USD).toLocaleString("en-US")}`}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="text-sm text-muted-foreground">
                                        <span>{t("pricing.deliveryTime")}: </span>
                                        <span className="font-medium text-foreground">{plan.details?.deliveryTime}</span>
                                    </div>

                                    {!plan.disabled && (
                                        <div className="mt-6 text-xs text-muted-foreground max-w-sm mx-auto bg-blue-50/50 rounded-lg p-3 border border-blue-100/60">
                                            {t("pricing.firstMonthFreeNote")}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ─── Description ─── */}
                    <section className="py-16 lg:py-20">
                        <div className="container mx-auto px-6">
                            <div className="max-w-2xl mx-auto">
                                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                                    {plan.details?.description}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ─── What Includes ─── */}
                    {plan.details?.includes?.length > 0 && (
                        <section className="py-16 lg:py-20 bg-muted/30 border-y border-border/40">
                            <div className="container mx-auto px-6">
                                <div className="max-w-2xl mx-auto">
                                    <h2 className="text-2xl font-bold mb-10">{t("pricing.whatIncludes")}</h2>
                                    <div className="space-y-5">
                                        {plan.details.includes.map((item, i) => (
                                            <div key={i} className="bg-background rounded-xl p-6 border border-border/40 shadow-sm">
                                                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                                                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* ─── Features ─── */}
                    {plan.features?.length > 0 && (
                        <section className="py-16 lg:py-20">
                            <div className="container mx-auto px-6">
                                <div className="max-w-2xl mx-auto">
                                    <h2 className="text-2xl font-bold mb-10">Incluye</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {plan.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-green-50/40 border border-green-100/60">
                                                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                                <span className="text-sm text-foreground">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* ─── Not Included ─── */}
                    {plan.notIncluded?.length > 0 && (
                        <section className="py-16 lg:py-20 bg-muted/30 border-y border-border/40">
                            <div className="container mx-auto px-6">
                                <div className="max-w-2xl mx-auto">
                                    <h2 className="text-2xl font-bold mb-10">{t("pricing.notIncluded")}</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {plan.notIncluded.map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border/40">
                                                <Minus className="h-5 w-5 text-muted-foreground/50 flex-shrink-0" />
                                                <span className="text-sm text-muted-foreground">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* ─── Ideal For ─── */}
                    {plan.details?.idealFor?.length > 0 && (
                        <section className="py-16 lg:py-20">
                            <div className="container mx-auto px-6">
                                <div className="max-w-2xl mx-auto">
                                    <h2 className="text-2xl font-bold mb-10">{t("pricing.idealFor")}</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {plan.details.idealFor.map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-primary/[0.04] border border-primary/10">
                                                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                                                <span className="text-sm font-medium text-foreground">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* ─── Change Policy ─── */}
                    <section className="py-16 lg:py-20 bg-muted/30 border-y border-border/40">
                        <div className="container mx-auto px-6">
                            <div className="max-w-2xl mx-auto">
                                <h2 className="text-2xl font-bold mb-4">{t("pricing.changePolicyTitle")}</h2>
                                <p className="text-base text-muted-foreground leading-relaxed">
                                    {t("pricing.changePolicyText")}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ─── CTA ─── */}
                    <section className="py-16 lg:py-20">
                        <div className="container mx-auto px-6">
                            <div className="max-w-md mx-auto text-center space-y-8">
                                <a
                                    href={whatsappLink(plan.whatsappMessage)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button size="lg" className="cursor-pointer w-full text-base py-6 shadow-sm" disabled={plan.disabled}>
                                        <FaWhatsapp className="h-5 w-5 mr-2" />
                                        {plan.cta}
                                    </Button>
                                </a>

                                <div className="mt-5 bg-amber-50/50 rounded-xl p-6 border border-amber-200/50 text-left">
                                    <p className="text-sm text-amber-800/80 leading-relaxed">
                                        <strong className="text-amber-900">{t("pricing.importantNote")}</strong>{" "}
                                        {t("pricing.noteText")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>
    );
}
