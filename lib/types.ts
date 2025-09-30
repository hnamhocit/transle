export interface LocaleData {
    [key: string]: string | Record<string, LocaleData>;
}

export type Translations = Record<string, LocaleData>;

export interface FlattenedTranslations {
    [key: string]: string;
}
