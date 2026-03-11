"use client";
import { createContext, useState, useEffect } from "react";

export const CurrencyContext = createContext(null);

export const CurrencyProvider = ({ children, initialCurrency = "ARS" }) => {
    const [currency, setCurrency] = useState(initialCurrency); // siempre ARS en SSR

    useEffect(() => {
        const saved = localStorage.getItem("currency");
        if (saved) setCurrency(saved);
    }, []); // lee localStorage solo en cliente

    useEffect(() => {
        localStorage.setItem("currency", currency);
    }, [currency]);

    const changeCurrency = (newCurrency) => setCurrency(newCurrency);

    return (
        <CurrencyContext.Provider value={{ currency, changeCurrency }}>
            {children}
        </CurrencyContext.Provider>
    );
};