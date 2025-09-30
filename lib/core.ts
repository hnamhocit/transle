import {useI18nStore} from "./store.ts";
import type {Translations} from "./types.ts";

async function initI18n(langs: string[], defaultLang = "en") {
    const translations: Translations = {};

    await Promise.all(
        langs.map(async (lang) => {
            try {
                const res = await fetch(`/locales/${lang}.json`);
                if (!res.ok) throw new Error(`Cannot load ${lang}.json`);
                translations[lang] = await res.json();
            } catch (e) {
                console.warn(`[i18n] Failed to load ${lang}.json`, e);
            }
        })
    );

    useI18nStore.getState().setTranslations(translations);

    const currentLang = useI18nStore.getState().lang;
    if (!langs.includes(currentLang)) {
        useI18nStore.getState().setLang(defaultLang);
    }
}

export {initI18n}