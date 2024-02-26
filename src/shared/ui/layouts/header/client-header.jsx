'use client'
import {useParams, usePathname} from "next/navigation";
import Link from "next/link";
import {getHrefLocale} from "@/i18n/get-href-locale";
import Logo from "@/shared/ui/layouts/header/logo";
import {fallbackLng} from "@/i18n/settings";

export default function ClientHeader({pageAllCities}) {
    const params = useParams();
    const path = usePathname();


    const isHomePage = path.replace(params.locale, '') === '/';

    const pageLocale = pageAllCities.locale === fallbackLng ? '' : `${pageAllCities.locale}/`
    const isAllCity = path === `/${pageLocale}${pageAllCities.slug}`
    const pointEvents = isHomePage || isAllCity ? {pointerEvents: 'none'} : {};
    return (
        <Link
            style={pointEvents}
            prefetch={false}
            href={getHrefLocale(pageAllCities.locale, pageAllCities.slug)}>
            <Logo/>
        </Link>
    );
}