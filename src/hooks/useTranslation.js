import { useCallback } from "react";
import { useLanguage } from "./useLanguage";
import { translations } from "@/i18n/translations";

export const useTranslation = () => {
    const { language } = useLanguage();

    const t = useCallback((key) => {
        const keys = key.split(".");
        let value = translations[language];
        for (const k of keys) {
            value = value?.[k];
        }
        return value ?? key;
    }, [language]);

    return { t };
};