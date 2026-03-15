"use client";

import { LanguageProvider } from "@/contexts/LanguageContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { ServicesProvider } from "@/contexts/PlansContext";

export function Providers({ children }) {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <ServicesProvider>
          {children}
        </ServicesProvider>
      </CurrencyProvider>
    </LanguageProvider>
  );
}