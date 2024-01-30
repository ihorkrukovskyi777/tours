"use client";
import {useState} from "react";
import {useParams, useSearchParams} from "next/navigation";
import Button from "@/shared/ui/selectors/button/button";
import {fallbackLng} from "@/i18n/settings";
import {useTranslation} from "@/i18n/client";
import Link from "next/link";
import FlagsComponents from "@/shared/ui/flags";

import './style.css';
import {getHrefLocale} from "@/i18n/get-href-locale";

export default function ChangeOfLanguage({languages, title}) {
    const searchParams = useSearchParams()
    const {t} = useTranslation("country");
    const [showLanguage, setShowLanguage] = useState(6);
    const params = useParams();
    const languagesFilter = languages?.filter(
        (item) => item.locale !== params?.locale
    );

    let querys = [];
    for (const key of searchParams.entries()) {
        querys.push(key);
    }

    querys = querys.map(([key, value], index) => {
        const param = index === 0 ? '?' : '&';
        return `${param}${key}=${value}`
    })
    querys = querys.join(',')
    const getHref = (locale) => locale === fallbackLng ? '' : `/${locale}`
    return (
        <section id="change-of-language">
            <div className="container">
                <h2>{t('Free Tours in Your Language')}</h2>
                <ul>
                    {languagesFilter?.slice(0, showLanguage).map((item) => {
                        return (
                            <li className="language" key={item.id}>
                                <Link
                                    href={`${getHref(item.locale)}/${item.slug}${querys}`}
                                    prefetch={false}
                                >
                                    <span className="wrap-txt">
                                       {title} {item.title} {t(`fullName.${item.locale}`)}</span>
                                    <FlagsComponents locale={item.locale}/>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                {showLanguage < languagesFilter?.length ?
                    <div className="block-center">
                        <Button onClick={() => setShowLanguage(value => value + 3)}>{t('Load More')}</Button>
                    </div>
                    :
                    null
                }
            </div>
        </section>
    )
}
