import {useI18nStore} from "./store.ts";

export function useT() {
    const lang = useI18nStore((state) => state.lang);
    const flattenTranslations = useI18nStore((state) => state.flattenTranslations);

    return (key: string) => {
        const langKey = `${lang}.${key}`;
        return flattenTranslations[langKey] || flattenTranslations[key] || key;
    };
}
