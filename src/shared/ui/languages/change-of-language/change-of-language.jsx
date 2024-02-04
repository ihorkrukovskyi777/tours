"use client";
import {useState} from "react";
import {useParams, useSearchParams} from "next/navigation";
import Button from "@/shared/ui/selectors/button/button";
import {fallbackLng} from "@/i18n/settings";
import {useTranslation} from "@/i18n/client";
import Link from "next/link";
import {countryLocales} from "@/i18n/locales";
import FlagsComponents from "@/shared/ui/flags";

import './style.css';

export default function ChangeOfLanguage({i18n, languages, title}) {
    const searchParams = useSearchParams()
    const {t} = useTranslation();
    const [showLanguage, setShowLanguage] = useState(6);
    const params = useParams();
    const languagesFilter = languages?.filter(
        (item) => item.locale !== params?.locale
    );

    let queries = [];
    for (const key of searchParams.entries()) {
        queries.push(key);
    }



    queries = queries.map(([key, value], index) => {
        const param = index === 0 ? '?' : '&';
        return `${param}${key}=${value}`
    })
    queries = queries.join(',')
    const getHref = (locale) => locale === fallbackLng ? '' : `/${locale}`
    return (
        <section id="change-of-language">
            <div className="container">
                <h2>{i18n.free_tour_tour_language}</h2>
                <ul>
                    {languagesFilter?.slice(0, showLanguage).map((item) => {
                        return (
                            <li className="language" key={item.id}>
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
