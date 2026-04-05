"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const businesses = [
    {
        name: "The Flare Initiative",
        url: "https://www.flareinitiative.org/",
        image: null,
    },
    {
        name: "CKS",
        url: "https://cks.com.ar",
        image: null,
    },
    {
        name: "Mar & Sierras",
        url: "https://marysierras.com",
        image: null,
    },
];

// Duplicate items to ensure smooth infinite scroll
const marqueeItems = [...businesses, ...businesses, ...businesses, ...businesses];

export default function TrustedBy() {
    const { t } = useTranslation();
    return (
        <div className="pt-8 mt-8 border-t border-border/50 max-w-sm">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                {t("hero.trustedBy")}
            </p>

            <div className="relative w-full overflow-hidden flex items-center">
                {/* Gradient Masks */}
                <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-background to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-background to-transparent" />

                <div className="flex w-fit">
                    <motion.div
                        className="flex gap-8 pr-8"
                        animate={{
                            x: ["0%", "-50%"],
                        }}
                        transition={{
                            duration: 25,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                    >
                        {marqueeItems.map((business, idx) => (
                            <Link
                                key={`${business.name}-${idx}`}
                                href={business.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex-shrink-0 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
                            >
                                {business.image ? (
                                    <div className="relative w-24 h-6 grayscale group-hover:grayscale-0 transition-all duration-300">
                                        <Image
                                            src={business.image}
                                            alt={business.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                ) : (
                                    <span className="text-sm font-semibold text-foreground flex items-center gap-1 group-hover:text-primary transition-colors">
                                        {business.name}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
