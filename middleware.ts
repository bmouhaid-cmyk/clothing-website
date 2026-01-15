import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ['fr', 'ar'];
const defaultLocale = 'fr';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Check if pathname already has a locale
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = defaultLocale; // Simplification: Always default to 'fr' for stability
        return NextResponse.redirect(
            new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        "/((?!_next|api|favicon.ico).*)",
    ],
};
