import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Lightweight, zero-dependency configuration
const locales = ['fr', 'ar'];
const defaultLocale = 'fr';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Check if the pathname is missing a locale
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if no locale is present
    if (pathnameIsMissingLocale) {
        const locale = defaultLocale;

        // Construct new URL with locale
        // e.g. /about -> /fr/about
        return NextResponse.redirect(
            new URL(`/${locale}${pathname}`, request.url)
        );
    }

    // Allow the request to proceed if valid
    return NextResponse.next();
}

export const config = {
    // Match all pathnames except for:
    // - /api routes
    // - /_next (internal)
    // - /_vercel (internal)
    // - files with extensions (e.g. .css, .js, .ico, .png)
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
