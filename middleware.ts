import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1. Define Locales strictly
const locales = ['fr', 'ar'];
const defaultLocale = 'fr';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // 2. Check if the pathname is missing a locale
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // 3. Redirect if no locale is present
    if (pathnameIsMissingLocale) {
        const locale = defaultLocale;
        // e.g. /about -> /fr/about
        // e.g. /   -> /fr
        return NextResponse.redirect(
            new URL(`/${locale}${pathname}`, request.url)
        );
    }

    // 4. Continue if valid
    return NextResponse.next();
}

export const config = {
    // 5. Strict Matcher: Exclude All Static Assets to prevent Edge Crashes
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
