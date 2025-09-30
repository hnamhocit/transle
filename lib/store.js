"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useI18nStore = void 0;
var zustand_1 = require("zustand");
var utils_1 = require("./utils");
var fallbackLang = (0, utils_1.getBrowserLang)();
exports.useI18nStore = (0, zustand_1.create)(function (set, get) { return ({
    lang: typeof window !== "undefined" ? localStorage.getItem("lang") || fallbackLang : fallbackLang,
    setLang: function (lang) {
        if (typeof window !== "undefined")
            localStorage.setItem("lang", lang);
        set({ lang: lang });
    },
    translations: {},
    setTranslations: function (translations) {
        set({
            translations: translations,
            flattenTranslations: (0, utils_1.flattenTranslations)(translations),
        });
    },
    getLangs: function () { return Object.keys(get().translations); },
    flattenTranslations: {},
}); });
