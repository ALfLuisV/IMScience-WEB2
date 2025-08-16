import { NextResponse } from 'next/server';


export function middleware(req) {
    const url = req.nextUrl.clone();
    const hostname = req.headers.get('host') || '';
    // const mainDomain = process.env.NODE_ENV === 'development' 
    // ? 'localhost:3000' 
    // : 'seudominio.com';

    const mainDomain = 'localhost:3000';
    const adminSubdomain = `admin.${mainDomain}`;

    const currentHost = hostname.split(':')[0];
    const adminHost = adminSubdomain.split(':')[0];

    if (currentHost === adminHost) {
        url.pathname = `/admin${url.pathname}`;
        return NextResponse.rewrite(url);
    }

    if (currentHost === mainDomain.split(':')[0] && url.pathname.startsWith('/admin')) {
        url.pathname = '/404'; // ou url.pathname = '/'; para redirecionar para a home
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();

}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
