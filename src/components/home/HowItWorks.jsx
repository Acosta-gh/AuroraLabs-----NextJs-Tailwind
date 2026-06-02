"use client";

import { MessageSquare, FileText, Code, Rocket } from 'lucide-react';
import { useTranslation } from "@/hooks/useTranslation";
import { useInView } from "@/hooks/useInView";

function HowItWorks() {
    const { t } = useTranslation();
    const [titleRef, titleInView] = useInView();

    const steps = [
        { number: "01", icon: MessageSquare, title: t('howItWorks.step1.title'), description: t('howItWorks.step1.description') },
        { number: "02", icon: FileText,      title: t('howItWorks.step2.title'), description: t('howItWorks.step2.description') },
        { number: "03", icon: Code,          title: t('howItWorks.step3.title'), description: t('howItWorks.step3.description') },
        { number: "04", icon: Rocket,        title: t('howItWorks.step4.title'), description: t('howItWorks.step4.description') },
    ];

    return (
        <section className="py-20 lg:py-28 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-6 relative">
                <div className="max-w-5xl mx-auto">

                    <div ref={titleRef} className={`text-center space-y-4 mb-16 transition-all duration-700 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">{t('howItWorks.title')}</h2>
                        <p className="text-lg md:text-xl text-muted-foreground">{t('howItWorks.subtitle')}</p>
                    </div>

                    <div className={`grid md:grid-cols-2 gap-8 mb-12 transition-all duration-700 delay-200 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        {steps.map((step, index) => (
                            <div key={index} className="group relative">
                                <div className="absolute inset-0 bg-primary/5 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                                <div className="relative bg-background rounded-xl p-8 border border-border/50 hover:border-border transition-all duration-300 hover:shadow-sm">
                                    <div className="flex items-start gap-6">
                                        <div className="flex-shrink-0">
                                            <div className="relative">
                                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                                    <step.icon className="h-6 w-6 text-primary" />
                                                </div>
                                                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                                                    {step.number}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2 pt-2">
                                            <h3 className="font-semibold text-xl text-foreground">{step.title}</h3>
                                            <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}

export default HowItWorks;