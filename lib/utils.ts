import type {FlattenedTranslations, LocaleData, Translations} from "./types.ts";

function flattenTranslations(translations: Translations): FlattenedTranslations {
    const result: FlattenedTranslations = {};

    function flatten(obj: LocaleData, prefix: string = '', lang: string) {
        for (const key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                flatten(obj[key] as LocaleData, prefix ? `${prefix}.${key}` : key, lang);
            } else {
                const newKey = prefix ? `${lang}.${prefix}.${key}` : `${lang}.${key}`;
                result[newKey] = obj[key] as string;
            }
        }
    }

    for (const lang in translations) {
        flatten(translations[lang], '', lang);
    }

    return result;
}

function getBrowserLang(fallback = "en") {
    if (typeof navigator === "undefined") return fallback;

    const langs = navigator.languages || [navigator.language || fallback];
    if (!langs.length) return fallback;

    return langs[0].split("-")[0];
}

export {flattenTranslations, getBrowserLang}