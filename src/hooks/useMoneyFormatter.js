import { useMemo } from "react";
import { useCurrency } from "./useCurrency";

export const useMoneyFormatter = () => {
    const { currency, changeCurrency } = useCurrency();

    const formatter = useMemo(() => {
        return new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency,
        });
    }, [currency]);

    const format = (amount) => {
        return formatter.format(amount);
    };

    return { currency, format, changeCurrency };
};