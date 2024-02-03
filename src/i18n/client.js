'use client';

import {useEffect} from 'react';
import {useParams} from "next/navigation";
import i18next  from 'i18next';
import {initReactI18next, useTranslation as useTransAlias} from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {fallbackLng, getOptions, locales} from './settings';
const filesNames = {
    common: 'tour-strawbery',
}
const runsOnServerSide = typeof window === 'undefined';

// Initialize i18next for the client side
i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(
        resourcesToBackend(
            async (language, namespace) => {
                if(language === fallbackLng) {
                    return {};
                }
                let translates = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/file-translates/${language}/${filesNames[namespace]}`, { next: { revalidate: 50 }});
                translates = await translates.json();
                return translates;
            }
        ),
    )
    .init({
        ...getOptions(),
        lng: undefined, // detect the language on the client
        detection: {
            order: ['path'],
        },
        preload: runsOnServerSide ? locales : [],
    });

export function useTranslation(lng = '', ns = 'common') {

    const params = useParams();
    const locale = !!lng === false ? params.locale : lng;
    const translator = useTransAlias(ns);
    const {i18n} = translator;

    // Run when content is rendered on server side
    if (runsOnServerSide && locale && i18n.resolvedLanguage !== locale) {
        i18n.changeLanguage(locale);
    } else {
        // Use our custom implementation when running on client side
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useCustomTranslationImplement(i18n, locale);
    }
    return translator;
}

function useCustomTranslationImplement(i18n, lng) {
    // This effect changes the language of the application when the lng prop changes.
    useEffect(() => {
        if (!lng || i18n.resolvedLanguage === lng) return;
        i18n.changeLanguage(lng);
    }, [lng, i18n]);
}
