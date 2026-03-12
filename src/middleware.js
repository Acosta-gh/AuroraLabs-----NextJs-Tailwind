import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname, search } = request.nextUrl;

    if (pathname.includes('//')) {
        const normalized = pathname.replace(/\/+/g, '/');
        const url = request.nextUrl.clone();
        url.pathname = normalized;
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/:path*',
};  