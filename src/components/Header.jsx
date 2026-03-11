"use client";

import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, Languages, CircleDollarSign } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useLanguage } from "@/hooks/useLanguage";
import { useCurrency } from "@/hooks/useCurrency";
import { useTranslation } from "@/hooks/useTranslation";
import logo from "@/assets/logo.png";

function Header() {
    const pathname = usePathname();
    const isHome = pathname === "/";

    const headerRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
    const [isLanguageMobileOpen, setIsLanguageMobileOpen] = useState(false);
    const [isCurrencyMobileOpen, setIsCurrencyMobileOpen] = useState(false);

    const { language, changeLanguage } = useLanguage();
    const { currency, changeCurrency } = useCurrency();
    const { t } = useTranslation();

    useEffect(() => {
        function handleClickOutside(event) {
            if (headerRef.current && !headerRef.current.contains(event.target)) {
                setIsMenuOpen(false);
                setIsLanguageOpen(false);
                setIsCurrencyOpen(false);
                setIsLanguageMobileOpen(false);
                setIsCurrencyMobileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header ref={headerRef} className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
                            <div className="relative">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></div>
                                <div className="relative transition-transform">
                                    <Image src={logo} alt="AuroraLabs Logo" width={48} height={48} className="object-contain drop-shadow-lg" />
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    {isHome && (
                        <nav className="hidden md:flex items-center space-x-1">
                            <a href="#home" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors">{t('home')}</a>
                            <a href="#services" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors">{t('services')}</a>
                            <a href="#contact" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors">{t('contact')}</a>
                        </nav>
                    )}

                    {/* Desktop Dropdowns */}
                    <div className="hidden md:flex">
                        {/* Currency */}
                        <div className="relative">
                            <button onClick={() => { setIsCurrencyOpen(!isCurrencyOpen); setIsLanguageOpen(false); }} className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
                                <CircleDollarSign className="h-4 w-4" />
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCurrencyOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-all duration-200 origin-top ${isCurrencyOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'}`}>
                                <a onClick={() => { setIsCurrencyOpen(false); changeCurrency("ARS"); }} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer">{t('currencies.ARS')}</a>
                                <a onClick={() => { setIsCurrencyOpen(false); changeCurrency("USD"); }} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer">{t('currencies.USD')}</a>
                            </div>
                        </div>

                        {/* Language */}
                        <div className="relative">
                            <button onClick={() => { setIsLanguageOpen(!isLanguageOpen); setIsCurrencyOpen(false); }} className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
                                <Languages className="h-4 w-4" />
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-all duration-200 origin-top ${isLanguageOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'}`}>
                                <a onClick={() => { setIsLanguageOpen(false); changeLanguage("es"); }} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer">Español</a>
                                <a onClick={() => { setIsLanguageOpen(false); changeLanguage("en"); }} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer">English</a>
                            </div>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
                        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className={`md:hidden border-t border-gray-200 bg-white overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 py-4 space-y-1">
                    <Link href="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">{t('home')}</Link>
                    <a onClick={() => setIsMenuOpen(false)} href="#services" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">{t('services')}</a>
                    <a onClick={() => setIsMenuOpen(false)} href="#contact" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">{t('contact')}</a>

                    {/* Mobile Currency */}
                    <div>
                        <button onClick={() => setIsCurrencyMobileOpen(!isCurrencyMobileOpen)} className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                            <span className="flex items-center gap-2"><CircleDollarSign className="h-4 w-4" />{t('selectCurrency')}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCurrencyMobileOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isCurrencyMobileOpen ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                            <div className="ml-3 space-y-1 border-l-2 border-gray-200 pl-3">
                                <a onClick={() => { changeCurrency("ARS"); setIsCurrencyMobileOpen(false); }} className={`block px-3 py-2 text-sm rounded-md transition-colors cursor-pointer ${currency === "ARS" ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>{t('currencies.ARS')}</a>
                                <a onClick={() => { changeCurrency("USD"); setIsCurrencyMobileOpen(false); }} className={`block px-3 py-2 text-sm rounded-md transition-colors cursor-pointer ${currency === "USD" ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>{t('currencies.USD')}</a>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Language */}
                    <div>
                        <button onClick={() => setIsLanguageMobileOpen(!isLanguageMobileOpen)} className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                            <span className="flex items-center gap-2"><Languages className="h-4 w-4" />{t('selectLanguage')}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isLanguageMobileOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isLanguageMobileOpen ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                            <div className="ml-3 space-y-1 border-l-2 border-gray-200 pl-3">
                                <a onClick={() => { changeLanguage("es"); setIsLanguageMobileOpen(false); }} className={`block px-3 py-2 text-sm rounded-md transition-colors cursor-pointer ${language === "es" ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>Español</a>
                                <a onClick={() => { changeLanguage("en"); setIsLanguageMobileOpen(false); }} className={`block px-3 py-2 text-sm rounded-md transition-colors cursor-pointer ${language === "en" ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>English</a>
                            </div>
                        </div>
                    </div>

                    <button className="w-full mt-4 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors shadow-sm">
                        {t('getStarted')}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;