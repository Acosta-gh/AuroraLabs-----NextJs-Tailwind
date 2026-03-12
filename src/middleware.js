import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname, search } = request.nextUrl;

    if (pathname.includes('//')) {
        const normalized = pathname.replace(/\/+/g, '/');
        return NextResponse.redirect(new URL(normalized + search, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/:path*',
};