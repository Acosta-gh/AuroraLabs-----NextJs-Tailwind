"use client";
import { Target, Users, Zap } from 'lucide-react';
import { useTranslation } from "@/hooks/useTranslation";
import { useInView } from "@/hooks/useInView";

function WhatMakesMeDifferent() {
    const { t } = useTranslation();
    const [titleRef, titleInView] = useInView();

    const differentiators = [
        { icon: Target, title: t('different.item1.title'), description: t('different.item1.description'), number: "01" },
        { icon: Users, title: t('different.item2.title'), description: t('different.item2.description'), number: "02" },
        { icon: Zap, title: t('different.item3.title'), description: t('different.item3.description'), number: "03" },
    ];

    return (
        <section className="py-20 lg:py-28 relative overflow-hidden bg-muted/30">
            <div className="container mx-auto px-6 relative">
                <div className="max-w-5xl mx-auto">

                    <div ref={titleRef} className={`text-center space-y-4 mb-16 transition-all duration-700 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                            {t('different.title')}
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                            {t('different.subtitle')}
                        </p>
                    </div>

                    <div className={`grid md:grid-cols-3 gap-8 mb-12 transition-all duration-700 delay-200 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        {differentiators.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="group relative">
                                    <div className="absolute inset-0 bg-primary/5 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                                    <div className="relative bg-background rounded-xl p-8 border border-border/50 hover:border-border transition-all duration-300 hover:shadow-sm h-full">
                                        <div className="flex items-start gap-6">
                                            <div className="flex-shrink-0">
                                                <div className="relative">
                                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                                        <Icon className="h-6 w-6 text-primary" />
                                                    </div>

                                                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                                                        {item.number}
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="space-y-2 pt-2">
                                                <h3 className="font-semibold text-xl text-foreground">{item.title}</h3>
                                                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}

export default WhatMakesMeDifferent;