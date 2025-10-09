import type {FlattenedTranslations, LocaleData, Translations} from "./types.ts";

export function flattenTranslations(translations: Translations): FlattenedTranslations {
    const result: FlattenedTranslations = {};

    function flatten(obj: LocaleData, prefix: string, lang: string) {
        for (const key in obj) {
            const value = obj[key];
            if (typeof value === "object" && value !== null) {
                flatten(value as LocaleData, prefix ? `${prefix}.${key}` : key, lang);
            } else {
                const fullKey = prefix ? `${lang}.${prefix}.${key}` : `${lang}.${key}`;
                result[fullKey] = value as string;
            }
        }
    }

    for (const lang in translations) {
        flatten(translations[lang], "", lang);
    }

    return result;
}

export function getBrowserLang(fallback = "en") {
    if (typeof navigator === "undefined") return fallback;
    const langs = navigator.languages || [navigator.language || fallback];
    return langs[0]?.split("-")[0] || fallback;
}