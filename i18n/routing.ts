import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['fr', 'ar'],

    // Used when no locale matches
    defaultLocale: 'fr'
});

// Explicitly export these to fix "Export not found" errors in layout.tsx
export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;
