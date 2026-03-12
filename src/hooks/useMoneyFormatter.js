import { useMemo } from "react";
import { useCurrency } from "./useCurrency";

const DEFAULT_CURRENCY = "ARS";

export const useMoneyFormatter = () => {
    const { currency, changeCurrency } = useCurrency();

    const formatter = useMemo(() => {
        const safeCurrency = currency || DEFAULT_CURRENCY;

        return new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: safeCurrency,
        });
    }, [currency]);

    const format = (amount) => {
        if (amount == null) return "";
        return formatter.format(amount);
    };

    return { currency, format, changeCurrency };
};