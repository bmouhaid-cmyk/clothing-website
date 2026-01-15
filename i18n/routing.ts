export const locales = ['fr', 'ar'] as const;
export const defaultLocale = 'fr';

export type Locale = (typeof locales)[number];
