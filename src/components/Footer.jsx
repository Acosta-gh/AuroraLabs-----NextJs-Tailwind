"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { useTranslation } from "@/hooks/useTranslation";

function Footer() {
    const { t } = useTranslation();

    const phone = "5492926501348";
    const message = t("hero.whatsappMessage") || "";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    return (
        <footer className="border-t border-border/40 bg-background">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="text-center space-y-8">
                    {/* Brand */}
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2.5">
                            <div className="relative transition-transform">
                                <Image src={logo} alt="AuroraLabs Logo" width={48} height={48} className="object-contain drop-shadow-lg" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">AuroraLabs</h3>
                        </div>
                        <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                            {t('footer.tagline')}
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

                    {/* Info */}
                    <div className="space-y-2 text-sm text-gray-600">
                        <p className="flex items-center justify-center gap-2">
                            {t('footer.operatedBy')}{" "}
                            <span className="text-gray-900 font-medium">
                                <a href="https://www.acosta.net.ar" target="_blank" rel="noopener noreferrer">
                                    Cristian Darío Acosta
                                </a>
                            </span>
                        </p>
                    </div>

                    {/* Copyright */}
                    <div className="pt-4">
                        <p className="text-xs text-gray-500 flex items-center justify-center gap-1.5">
                            © {new Date().getFullYear()} AuroraLabs. {t('footer.rights')}
                        </p>
                    </div>

                    {/* Privacy */}
                    <div className="pt-4">
                        <Link href="/privacy" className="text-xs text-gray-500 flex items-center justify-center gap-1.5 hover:text-gray-800 transition-colors">
                            {t('footer.privacy')}
                        </Link>
                    </div>

                    <p className="text-xs text-gray-500 flex items-center justify-center gap-1.5">
                        {t('footer.madeWith')}
                        <Heart className="h-3 w-3 text-red-500 fill-red-500" />
                        {t('footer.from')}
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;