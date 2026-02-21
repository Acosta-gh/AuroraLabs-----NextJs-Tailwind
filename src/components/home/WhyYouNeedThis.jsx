"use client";

import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "@/hooks/useTranslation";
import { FaWhatsapp } from "react-icons/fa";

function WhyYouNeedThis() {
    const { t } = useTranslation();
    const args = t("whyYouNeed.arguments");

    return (
        <section className="py-20 lg:py-28 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-6 relative">
                <div className="max-w-4xl mx-auto">

                    <Fade triggerOnce direction="up" cascade damping={0.1}>
                        <div className="text-center space-y-4 mb-16">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                                {t("whyYouNeed.mainTitle")}
                            </h2>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                                {t("whyYouNeed.paragraph1")}
                            </p>
                        </div>
                    </Fade>

                    <Fade triggerOnce delay={200}>
                        <div className="relative mb-12">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-purple-500/5 blur-2xl rounded-2xl"></div>
                            <div className="relative bg-background rounded-xl p-8 md:p-10 border border-border/50 shadow-sm">
                                <p className="text-base md:text-lg leading-relaxed text-foreground/90">
                                    {t("whyYouNeed.paragraph2")}
                                </p>
                                <p className="mt-4 font-semibold text-foreground text-base md:text-lg">
                                    {t("whyYouNeed.paragraph3")}
                                </p>
                            </div>
                        </div>
                    </Fade>

                    <Fade triggerOnce cascade damping={0.1} delay={300}>
                        <div className="grid sm:grid-cols-2 gap-4 mb-14">
                            {Object.values(args).map((issue, index) => (
                                <div key={index} className="group relative">
                                    <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                                    <div className="relative flex flex-col gap-3 p-6 bg-background rounded-lg border border-border/50 hover:border-border transition-all duration-300 hover:shadow-sm">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                            <p className="font-semibold text-foreground">{issue.title}</p>
                                        </div>
                                        <p className="text-sm text-muted-foreground pl-8">{issue.description}</p>
                                        <p className="text-xs text-primary font-medium pl-8">{issue.stat}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Fade>

                    <Fade triggerOnce delay={500}>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a href='#services'>
                                <Button size="lg" className="group">
                                    {t("whyYouNeed.buttons.primary")}
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </a>
                        </div>
                    </Fade>

                </div>
            </div>
        </section>
    );
}

export default WhyYouNeedThis;