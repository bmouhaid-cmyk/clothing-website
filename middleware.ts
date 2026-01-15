import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ['fr', 'ar'];
const defaultLocale = 'fr';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Check if pathname already has a locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    // Redirect if there is no locale
    const locale = defaultLocale;
    const url = new URL(`/${locale}${pathname}`, request.url);
    return NextResponse.redirect(url);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        "/((?!_next|api|favicon.ico).*)",
    ],
};
