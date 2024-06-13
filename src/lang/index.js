const locale = navigator.language || 'en'

const localeEn = require('./locales/en.json')
const localePt = require('./locales/pt.json')

const localesMap = {
    'en': localeEn,
    'pt-BR': localePt
}

const localeData = localesMap[locale]

export const tr = (key) => localeData[key] || key