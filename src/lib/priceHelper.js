export function formatPrice(priceObj, currency, fallback = "Consultar") {
    if (!priceObj || typeof priceObj !== 'object') return fallback;

    const value = priceObj[currency];
    if (value === undefined || value === null || isNaN(Number(value))) {
        return fallback;
    }

    return currency === "ARS"
        ? `$${Number(value).toLocaleString("es-AR")}`
        : `$${Number(value).toLocaleString("en-US")}`;
}

export function calculateDiscount(originalPriceObj, priceObj, currency) {
    if (!originalPriceObj || !priceObj || typeof originalPriceObj !== 'object' || typeof priceObj !== 'object') return null;

    const original = originalPriceObj[currency];
    const current = priceObj[currency];

    if (original === undefined || current === undefined || isNaN(original) || isNaN(current)) return null;
    if (original <= current || original <= 0) return null;

    return Math.round(((original - current) / original) * 100);
}
