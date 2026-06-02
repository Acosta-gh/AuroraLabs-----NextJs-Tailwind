"use client";

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import hero from "@/assets/hero.png";
import { useTranslation } from "@/hooks/useTranslation";
import { useInView } from "@/hooks/useInView";
import TrustedBy from "./TrustedBy";

function Hero() {
    const { t } = useTranslation();
    const [heroRef, heroInView] = useInView({ threshold: 0.1 });
    const phone = "5492926501348";
    const message = t("hero.whatsappMessage");
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    return (
        <section id='home' className="container mx-auto px-6 py-25 relative" ref={heroRef}>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                {/* Left Content */}
                <div className={`space-y-8 relative z-10 transition-all duration-700 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                            {t("hero.title")}
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-xl">
                            {t("hero.description")}
                        </p>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div>
                            <span className="block text-2xl font-bold text-foreground">+10</span>
                            <span>{t("hero.projects")}</span>
                        </div>
                        <div className="h-8 w-px bg-border"></div>
                        <div>
                            <span className="block text-2xl font-bold text-foreground">24-72{t("hero.hours")}</span>
                            <span>{t("hero.response")}</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            <Button size="lg" className="group">
                                <FaWhatsapp className="h-5 w-5 mr-2" />
                                {t("hero.whatsapp")}
                            </Button>
                        </a>
                        <a href='#projects'>
                            <Button size="lg" variant="outline">
                                {t("hero.viewProjects")}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </a>
                    </div>

                    <TrustedBy />
                </div>

                {/* Mobile image */}
                <div className="absolute inset-0 lg:hidden pointer-events-none overflow-hidden">
                    <div className={`absolute right-[-8rem] top-[-5rem] w-[600px] h-[600px] opacity-40 animate-subtle-slide-down`}>
                        <Image src={hero} alt="" className="w-full h-full object-contain drop-shadow-sm" priority fetchPriority="high" />
                    </div>
                </div>

                {/* Desktop image */}
                <div className="hidden lg:block relative lg:h-[600px] bottom-25 opacity-80">
                    <div className={`relative h-full overflow-hidden animate-subtle-slide-down`}>
                        <Image src={hero} alt="Desarrollo web profesional" className="w-full h-full object-cover drop-shadow-sm" priority fetchPriority="high" />
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Hero;
