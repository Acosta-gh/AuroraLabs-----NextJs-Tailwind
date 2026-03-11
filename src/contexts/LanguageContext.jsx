"use client";
import { createContext, useState, useEffect } from "react";
import { translations } from "@/i18n/translations";

export const LanguageContext = createContext(null);

export const LanguageProvider = ({ children, initialLanguage = "es" }) => {
  const [language, setLanguage] = useState(initialLanguage);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("language") ||
        navigator.language?.split("-")[0];
      if (saved && translations[saved]) setLanguage(saved);
    } catch (e) { }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("language", language);
      document.documentElement.lang = language;
    } catch (e) { }
  }, [language]);

  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};