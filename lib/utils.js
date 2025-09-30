"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenTranslations = flattenTranslations;
exports.getBrowserLang = getBrowserLang;
function flattenTranslations(translations) {
    var result = {};
    function flatten(obj, prefix, lang) {
        if (prefix === void 0) { prefix = ''; }
        for (var key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                flatten(obj[key], prefix ? "".concat(prefix, ".").concat(key) : key, lang);
            }
            else {
                var newKey = prefix ? "".concat(lang, ".").concat(prefix, ".").concat(key) : "".concat(lang, ".").concat(key);
                result[newKey] = obj[key];
            }
        }
    }
    for (var lang in translations) {
        flatten(translations[lang], '', lang);
    }
    return result;
}
function getBrowserLang(fallback) {
    if (fallback === void 0) { fallback = "en"; }
    if (typeof navigator === "undefined")
        return fallback;
    var langs = navigator.languages || [navigator.language || fallback];
    if (!langs.length)
        return fallback;
    return langs[0].split("-")[0];
}
