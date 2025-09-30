"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useT = useT;
var store_1 = require("./store");
function useT() {
    var lang = (0, store_1.useI18nStore)(function (state) { return state.lang; });
    var flattenTranslations = (0, store_1.useI18nStore)(function (state) { return state.flattenTranslations; });
    return function (key) {
        var langKey = "".concat(lang, ".").concat(key);
        return flattenTranslations[langKey] || flattenTranslations[key] || key;
    };
}
