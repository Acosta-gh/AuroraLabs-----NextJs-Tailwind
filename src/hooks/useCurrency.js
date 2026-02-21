import { useContext } from "react";
import { CurrencyContext } from "@/contexts/CurrencyContext";

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error("useCurrency debe usarse dentro de CurrencyProvider");
    }
    return context; // { currency, changeCurrency }
};
