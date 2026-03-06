export const PLAN_PRICES = {
    presencia: {
        price: { ARS: 59999, USD: 49 },
        monthly: { ARS: 4999, USD: 5 },
        originalPrice: { ARS: 119999, USD: 99 },
        onSale: true
    },
    empresa: {
        price: { ARS: 119999, USD: 99 },
        monthly: { ARS: 14999, USD: 15 },
        originalPrice: { ARS: 239999, USD: 149 },
        onSale: true,
        popular: true,
        disabled: false,
    },
    eCatalog: {
        price: { ARS: 119999, USD: 99 },
        monthly: { ARS: 14999, USD: 15 },
        originalPrice: { ARS: 239999, USD: 149 },
        onSale: true,
        popular: false,
        disabled: false,
    },
    ecommerce: {
        price: { ARS: 450000, USD: 499 },
        monthly: { ARS: 49999, USD: 49 },
        onSale: false,
        disabled: true
    }
};