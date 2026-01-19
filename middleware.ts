import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Only run logic if we are at the exact root '/'
    if (request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/fr', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/'], // Only run on the homepage, ignore everything else
};
