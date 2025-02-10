'use client'
import {useEffect, useState} from "react";
import {useLocale} from "next-intl";
import {locales} from "@/i18n/settings";
const notFoundTitle = {
    en: 'Page Not Found',
    ru: 'Page Not Found',
    de: 'Seite nicht gefunden',
    es: 'Página no encontrada',
    it: 'Pagina non trovata',
    'cat': 'Página não encontrada',
    nl: 'Pagina niet gevonden',
    pl: 'Nie znaleziono strony',
}
export default function NotFound() {
    const [fields, setFields] = useState({
        error: '',
        text: '',
        title: '',
    })
    const paramsLocale = useLocale()


    const locale = locales.includes(paramsLocale) ? paramsLocale : 'en'
    useEffect(() => {
        const fetchData = async () => {
            const data = fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/page/type/not-found?locale=${locale}`, {next: {revalidate: 60 * 10 }});
            return (await data).json()
        }
        fetchData().then((res) => {
            setFields(res)
        })
    }, [])
    return (
        <div>
            <title>{notFoundTitle[locale] ?? notFoundTitle['en']}</title>
            <div className="content page-404">
                <div className="container">
                    <article>
                        <p>{fields.title}</p>
                        <h1>{fields.error}</h1>
                        <p dangerouslySetInnerHTML={{__html: fields.text}}>

                        </p>
                    </article>
                </div>
            </div>
        </div>
    )
}