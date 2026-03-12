import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname, search } = request.nextUrl;

    if (pathname.includes('//')) {
        const normalized = pathname.replace(/\/+/g, '/');

        // Build URL from scratch — don't clone a potentially broken URL
        const base = request.nextUrl.origin;          // e.g. https://example.com
        const redirectUrl = new URL(normalized + search, base);

        return NextResponse.redirect(redirectUrl, { status: 308 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/:path*',
};