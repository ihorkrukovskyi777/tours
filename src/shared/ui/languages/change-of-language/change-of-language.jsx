"use client";
import { useState} from "react";
import {useSearchParams} from "next/navigation";
import Button from "@/shared/ui/selectors/button/button";
import {fallbackLng} from "@/i18n/settings";
import Link from "next/link";
import {countryLocales} from "@/i18n/locales";
import FlagsComponents from "@/shared/ui/flags";
import {useLocale} from "use-intl";
import './style.css';

export default function ChangeOfLanguage({parentLocale,i18n, languages, title, filterQuery = [], addQueries = false}) {
    const searchParams = useSearchParams()
    const [showLanguage, setShowLanguage] = useState(6);

    const localePage = useLocale();
    const locale = parentLocale ? parentLocale : localePage

    const languagesFilter = languages?.filter(
        (item) => item.locale !== locale
    ).filter(item => {

        if(locale === fallbackLng) {
            return true;
        }

        if(locale === 'es') {
            return item.locale === fallbackLng
        }
        return item.locale === fallbackLng || item.locale === 'es';
    });

    let queries = [];
    for (const key of searchParams.entries()) {
        queries.push(key);
    }
    queries = queries.filter(([key]) => {
        return !filterQuery.includes(key)
    }).map(([key, value], index) => {
        const param = index === 0 ? '?' : '&';
        return `${param}${key}=${value}`
    })
    queries = addQueries ? queries.join('') : '';
    const getHref = (locale) => locale === fallbackLng ? '' : `/${locale}`

    if(!languagesFilter.length) {
        return null;
    }
    return (
        <section id="change-of-language">
            <div className="container">
                <h2>{i18n.free_tour_tour_language}</h2>
                <ul>
                    {languagesFilter?.slice(0, showLanguage).map((item) => {
                        return (
                            <li className="language" key={item.slug + item.locale}>
                                <Link
                                    href={`${getHref(item.locale)}/${item.slug}${queries}`}
                                    prefetch={false}
                                >
                                    <span className="wrap-txt">
                                       {title} {item.title} {countryLocales[item.locale]}</span>
                                    <FlagsComponents locale={item.locale}/>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                {showLanguage < languagesFilter?.length ?
                    <div className="block-center">
                        <Button onClick={() => setShowLanguage(value => value + 3)}>{i18n.load_more}</Button>
                    </div>
                    :
                    null
                }
            </div>
        </section>
    )
}
