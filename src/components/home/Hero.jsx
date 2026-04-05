"use client";

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";
import hero from "@/assets/hero.png";
import { Fade } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import { useTranslation } from "@/hooks/useTranslation";
import TrustedBy from "./TrustedBy";

const fadeToSubtleSlideDown = keyframes`
  0% { opacity: 0; transform: translateY(-30px); }
  60% { opacity: 1; transform: translateY(0); }
  100% { opacity: 1; transform: translateY(0px); }
`;

function Hero() {
    const { t } = useTranslation();
    const phone = "5492926501348";
    const message = t("hero.whatsappMessage");
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    return (
        <section id='home' className="container mx-auto px-6 py-25 relative">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                {/* Left Content */}
                <div className="space-y-8 relative z-10">
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
                    <Fade triggerOnce keyframes={fadeToSubtleSlideDown} duration={1600} easing="ease-out">
                        <div className="absolute right-[-8rem] top-[-5rem] w-[600px] h-[600px] opacity-40">
                            <img src={hero.src} alt="Desarrollo web profesional" className="w-full h-full object-contain drop-shadow-sm" />
                        </div>
                    </Fade>
                </div>

                {/* Desktop image */}
                <div className="hidden lg:block relative lg:h-[600px] bottom-25 opacity-80">
                    <Fade triggerOnce keyframes={fadeToSubtleSlideDown} duration={1600} easing="ease-out">
                        <div className="relative h-full overflow-hidden">
                            <img src={hero.src} alt="Desarrollo web profesional" className="w-full h-full object-cover drop-shadow-sm" />
                        </div>
                    </Fade>
                </div>

            </div>
        </section>
    );
}

export default Hero;