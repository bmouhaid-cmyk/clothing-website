import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Zero external imports to prevent "Poisoned Imports" in Edge Runtime
const locales = ['fr', 'ar'];
const defaultLocale = 'fr';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Check if the pathname already starts with a locale
    // e.g. /fr/about or /ar
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        return NextResponse.next();
    }

    // Redirect if no locale is present
    const locale = defaultLocale;
    const newUrl = new URL(`/${locale}${pathname}`, request.url);

    // Preserve query parameters
    newUrl.search = request.nextUrl.search;

    return NextResponse.redirect(newUrl);
}

export const config = {
    // Strict Matcher to exclude all static assets and internal paths
    // Prevents "Broad Matcher" crashes
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|svg|ico|webp|js|css|woff|woff2|ttf|eot)).*)'
    ]
};
