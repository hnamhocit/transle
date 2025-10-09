export type LocaleData = {
    [key: string]: string | LocaleData;
};

export type Translations = Record<string, LocaleData>;

export type FlattenedTranslations = Record<string, string>;
