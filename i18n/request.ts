import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './routing';

export default getRequestConfig(async ({ locale }) => {
    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(locale as any)) {
        return {
            messages: (await import(`../messages/${defaultLocale}.json`)).default
        };
    }

    return {
        messages: (await import(`../messages/${locale}.json`)).default
    };
});
