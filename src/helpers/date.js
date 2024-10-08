export const dateFormat = (date) => {
    const { locale, timeZone } = Intl.DateTimeFormat().resolvedOptions();

    if (!locale || !timeZone) {
        return date
    }

    const [year, month, day] = date.split('-')

    return new Intl.DateTimeFormat(locale, {
        timeZone
    }).format(new Date(year, month - 1, day))
}