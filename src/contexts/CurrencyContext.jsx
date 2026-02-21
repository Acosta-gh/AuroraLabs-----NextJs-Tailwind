"use client";

import { createContext, useState, useEffect } from "react";

export const CurrencyContext = createContext(null);

export const CurrencyProvider = ({ children, initialCurrency = "ARS" }) => {
    const [currency, setCurrency] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("currency") || initialCurrency;
        }
        return initialCurrency;
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("currency", currency);
        }
    }, [currency]);

    const changeCurrency = (newCurrency) => {
        setCurrency(newCurrency);
    };

    return (
        <CurrencyContext.Provider value={{ currency, changeCurrency }}>
            {children}
        </CurrencyContext.Provider>
    );
};