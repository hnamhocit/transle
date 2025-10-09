import {useI18nStore} from "./store.ts";
import type {Translations} from "./types.ts";

export function initI18n(translations: Translations, defaultLang = "en") {
    useI18nStore.getState().setTranslations(translations);

    const currentLang = useI18nStore.getState().lang;
    if (!Object.keys(translations).includes(currentLang)) {
        useI18nStore.getState().setLang(defaultLang);
    }
}
