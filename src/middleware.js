// eslint-disable-next-line @next/next/no-server-import-in-page
import {NextResponse} from 'next/server';
import {fallbackLng, locales} from './i18n/settings';
import {Page410} from "@/page-410";
import createMiddleware from "next-intl/middleware";
import {PAID_TOUR_IN_CITY} from "@/i18n/path-rewrites/paid-tour-in-city.mjs";
export async function middleware(request) {
    // Check if there is any supported locale in the pathname
    const pathname = request.nextUrl.pathname;
    const origin = request.nextUrl.origin;

    try {
        const firstPath = pathname.split('/').filter(slug => !!slug)



        const [slugApi410, nextSlug] = firstPath;

        console.log(firstPath, 'ssdasdsaa')
        if((slugApi410.toLowerCase() === PAID_TOUR_IN_CITY.path.toLowerCase()) || (locales.includes(slugApi410) && nextSlug.toLowerCase() === PAID_TOUR_IN_CITY.path.toLowerCase())) {
            const locale = locales.includes(slugApi410.toLowerCase()) ? slugApi410 : 'en'
            return NextResponse.rewrite(new URL(`/${locale}/not-found`, request.url));
        }

        if (slugApi410 === 'ajax_tour') {
            return new NextResponse(Page410(),
                {status: 410, headers: {'content-type': 'text/html'}}
            )
        } else if (slugApi410 === 'wp-json') {
            return new NextResponse(Page410(),
                {status: 410, headers: {'content-type': 'text/html'}}
            )
        }

        const isGuidePage410 = locales.find(locale => pathname === `/guide/${locale}`);
        if (isGuidePage410) {
            return new NextResponse(Page410(),
                {status: 410, headers: {'content-type': 'text/html'}}
            )
        }

        let ifToursPage = pathname.split('/').filter(slug => !!slug)
        const locale = locales.find(locale => ifToursPage[0]?.toLowerCase() === locale.toLowerCase()) ?? fallbackLng


        if(locale.includes(ifToursPage[0])) {
            ifToursPage = ifToursPage.slice(1);
        }
        if (ifToursPage[ifToursPage.length - 1] === 'tours' && ifToursPage.length === 2) {
            const slug = ifToursPage[0];
            const pageType = await fetch(
                `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/page/${slug}?locale=${locale}`,
                {next: {revalidate: 60,  tags: ['page']}}
            )
            const data = await pageType.json();
            const slugLocale = locale === fallbackLng ? '' : `${locale}/`;
            if(data?.type === 'city') {
                return NextResponse.redirect(new URL(origin + '/' + slugLocale + ifToursPage[0].toLowerCase()), 301)
            } else {
                return new NextResponse(Page410(),
                    {status: 410, headers: {'content-type': 'text/html'}}
                )
            }
        }

    } catch (err) {
        console.log(err);
    }
    if (pathname !== pathname.toLowerCase()) {
        return NextResponse.redirect(new URL(origin + pathname.toLowerCase()), 301)
    }
    // By using URL, we're making sure that query string stays as it is.
    if (pathname !== '/') {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/redirect/${encodeURIComponent(pathname)}`, {
                next: {
                    revalidate: 60,
                    tags: ['redirect']
                }
            });
            const redirect = await response.json();

            if (redirect.code) {

                const replaceList = [
                    process.env.NEXT_PUBLIC_CANONICAL_DOMAIN,
                    process.env.NEXT_PUBLIC_CANONICAL_DOMAIN.replace('https://', ''),
                    process.env.NEXT_PUBLIC_CANONICAL_DOMAIN.replace('http://', ''),
                ]
                const to = replaceList.reduce((to, val) => {
                    return to.replace(val, '')
                }, redirect.to)
                return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}${to}`), {status: redirect?.code || 307})
            }
        } catch (err) {
            console.log(err)
        }
    }
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



export default createMiddleware({
    defaultLocale: fallbackLng,
    locales,
    localeDetection: false,
    localePrefix: "as-needed",
    // localePrefix: "always"
});
export const config = {
    // Do not run the middleware on the following paths
    matcher: ['/((?!api|_next/static|not-found|_next/image|manifest.json|assets|favicon.ico|robots.txt|default.json|sitemap/*).*)']
};
