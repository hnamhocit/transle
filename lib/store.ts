import {create} from "zustand";
import type {FlattenedTranslations, Translations} from "./types.ts";
import {flattenTranslations, getBrowserLang} from "./utils.ts";

interface I18nStore {
    lang: string;
    setLang: (lang: string) => void;
    translations: Translations;
    setTranslations: (translations: Translations) => void;
    getLangs: () => string[];
    flattenTranslations: FlattenedTranslations;
}

const fallbackLang = getBrowserLang()

const useI18nStore = create<I18nStore>((set, get) => ({
    lang: typeof window !== "undefined" ? localStorage.getItem("lang") || fallbackLang : fallbackLang,
    setLang: (lang) => {
        if (typeof window !== "undefined") localStorage.setItem("lang", lang);
        set({lang});
    },
    translations: {},
    setTranslations: (translations) => {
        set({
            translations,
            flattenTranslations: flattenTranslations(translations),
        });
    },
    getLangs: () => Object.keys(get().translations),
    flattenTranslations: {},
}));

export {useI18nStore}