import {NextResponse} from 'next/server';
import {fallbackLng, locales} from './i18n/settings';

export function middleware(request) {
    // Check if there is any supported locale in the pathname
    const pathname = request.nextUrl.pathname;

    // Check if the default locale is in the pathname
    if (
        pathname.startsWith(`/${fallbackLng}/`) ||
        pathname === `/${fallbackLng}`
    ) {
        // e.g. incoming request is /en/about
        // The new URL is now /about
        return NextResponse.redirect(
            new URL(
                pathname.replace(
                    `/${fallbackLng}`,
                    pathname === `/${fallbackLng}` ? '/' : '',
                ),
                request.url,
            ),
        );
    }

    const pathnameIsMissingLocale = locales.every(
        locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
    );

    if (pathnameIsMissingLocale) {
        // We are on the default locale
        // Rewrite so Next.js understands

        // e.g. incoming request is /about
        const newUrlSearch = new URL(request.url);
        let getParams = '';

        if (newUrlSearch.search) {
            getParams = newUrlSearch.search;
        }
        return NextResponse.rewrite(
            new URL(`/${fallbackLng}${pathname}${getParams}`, request.url),
        );
    }
}

export const config = {
    // Do not run the middleware on the following paths
    matcher: ['/((?!api|_next/static|not-found|_next/image|manifest.json|assets|favicon.ico|robots.txt|default.json|sitemap/*).*)']
};
