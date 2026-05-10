"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check, Zap, ArrowLeft } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
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
                <div className="text-xl text-muted-foreground line-through decoration-2 decoration-red-500">
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
                <Button onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t("back")}
                </Button>
            </div>
        );
    }

    return (
        <section className="py-20 lg:py-28 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative">
                <div className="max-w-3xl mx-auto">

                    <Link
                        href="/more-tiers"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group mb-8"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        {t("backToPlans")}
                    </Link>

                    {loading ? (
                        <PricingSkeletonGrid count={1} />
                    ) : (
                        <Fade triggerOnce direction="up">
                            <div className="bg-background rounded-xl border overflow-hidden">
                                <div className="relative">
                                    {plan.onSale && !plan.disabled && (
                                        <div className="absolute transform rotate-45 bg-green-600 text-center text-white font-semibold py-1 right-[-35px] top-[32px] w-[170px] shadow-lg z-10">
                                            {calculateDiscount(plan.originalPrice, plan.price, currency) || plan.discountPercentage}% OFF
                                        </div>
                                    )}
                                </div>

                                <div className={`text-center mb-6 pb-6 border-b border-border/50 px-8 ${plan.popular && !plan.disabled ? "pt-16" : "pt-8"}`}>
                                    {plan.popular && !plan.disabled && (
                                        <div className="flex justify-center mb-4">
                                            <span className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                                                {t("pricing.mostPopular")}
                                            </span>
                                        </div>
                                    )}
                                    <h1 className="font-bold text-3xl mb-2">{plan.name}</h1>
                                    <p className="text-muted-foreground mb-6">{plan.tagline}</p>

                                    <div className="mb-2">
                                        <PriceDisplay plan={plan} currency={currency} />
                                    </div>

                                    {plan.onSale && plan.originalPrice && plan.price && plan.originalPrice[currency] && plan.price[currency] && (
                                        <div className="mt-3">
                                            <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-200">
                                                <Zap className="h-3 w-3 fill-current" />
                                                {t("pricing.saved")}{" "}
                                                {currency === "ARS"
                                                    ? `$${(plan.originalPrice.ARS - plan.price.ARS).toLocaleString("es-AR")}`
                                                    : `$${(plan.originalPrice.USD - plan.price.USD).toLocaleString("en-US")}`}
                                            </span>
                                        </div>
                                    )}

                                    <div className="text-xs text-muted-foreground mt-3">
                                        {t("pricing.deliveryTime")}: <span className="font-semibold text-foreground">{plan.details?.deliveryTime}</span>
                                    </div>
                                </div>

                                <div className="px-8 pb-8 space-y-8">
                                    <div className="text-base text-muted-foreground leading-relaxed">
                                        {plan.details?.description}
                                    </div>

                                    {plan.details?.includes?.length > 0 && (
                                        <div>
                                            <h3 className="font-semibold text-lg mb-4">{t("pricing.whatIncludes")}</h3>
                                            <div className="space-y-4">
                                                {plan.details.includes.map((item, i) => (
                                                    <div key={i} className="border-l-2 border-primary pl-4">
                                                        <h5 className="font-semibold text-sm mb-1">{item.title}</h5>
                                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {plan.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-3 text-sm">
                                                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {plan.details?.idealFor?.length > 0 && (
                                        <div>
                                            <h3 className="font-semibold text-lg mb-4">{t("pricing.idealFor")}</h3>
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {plan.details.idealFor.map((item, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-sm">
                                                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {plan.notIncluded?.length > 0 && (
                                        <div>
                                            <h3 className="font-semibold text-lg mb-4">{t("pricing.notIncluded")}</h3>
                                            <ul className="grid grid-cols-1 gap-2">
                                                {plan.notIncluded.map((item, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <span className="h-4 w-4 text-muted-foreground flex-shrink-0">—</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <a
                                        href={whatsappLink(plan.whatsappMessage)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button size="lg" className="w-full group" disabled={plan.disabled}>
                                            <FaWhatsapp className="h-4 w-4" />
                                            {plan.cta}
                                        </Button>
                                    </a>

                                    <div className="bg-muted/30 rounded-xl p-6 border border-border/50 text-center">
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            <strong className="text-foreground">{t("pricing.importantNote")}</strong> {t("pricing.noteText")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    )}
                </div>
            </div>
        </section>
    );
}
