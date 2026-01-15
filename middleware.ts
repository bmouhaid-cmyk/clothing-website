import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the pathname already has a locale
    const pathnameHasLocale = pathname.startsWith('/fr') || pathname.startsWith('/ar');

    if (pathnameHasLocale) return NextResponse.next();

    // Redirect to default locale (/fr) if no locale is present
    const url = new URL(request.url);
    url.pathname = `/fr${pathname}`;
    return NextResponse.redirect(url);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        "/((?!_next|api|favicon.ico).*)",
    ],
};
