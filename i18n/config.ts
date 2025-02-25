export const locales = ['ar', 'en'] as const;
export type TLocale = (typeof locales)[number];
