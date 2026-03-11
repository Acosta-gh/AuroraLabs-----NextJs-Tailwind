"use client";
import { createContext, useState, useEffect } from "react";

export const CurrencyContext = createContext(null);

export const CurrencyProvider = ({ children, initialCurrency = "ARS" }) => {
    const [currency, setCurrency] = useState(initialCurrency);

    useEffect(() => {
        try {
            const saved = localStorage.getItem("currency");
            if (saved) setCurrency(saved);
        } catch (e) { }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem("currency", currency);
        } catch (e) { }
    }, [currency]);

    const changeCurrency = (newCurrency) => setCurrency(newCurrency);

    return (
        <CurrencyContext.Provider value={{ currency, changeCurrency }}>
            {children}
        </CurrencyContext.Provider>
    );
};