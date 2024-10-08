import { tr } from "../lang";

export const toCurrency = (value) => {
    const { locale } = Intl.NumberFormat().resolvedOptions();

    if (!locale) {
        return tr("currencySymbol") + " " + value;
    }

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: tr("currency"),
    }).format(value);
};