import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname, search } = request.nextUrl;
    if (pathname.includes('//')) {
        const normalized = pathname.replace(/\/+/g, '/');
        const redirectUrl = new URL(normalized + search, request.nextUrl.origin);
        return NextResponse.redirect(redirectUrl, { status: 308 });
    }
    return NextResponse.next();
}

export const config = {
    matcher: '/:path*',
};