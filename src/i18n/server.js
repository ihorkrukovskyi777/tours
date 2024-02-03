import {createInstance} from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import {initReactI18next} from 'react-i18next/initReactI18next';
import {fallbackLng, getOptions} from './settings';

const filesNames = {
    common: 'tour-strawbery',
}
// Initialize the i18n instance
const initI18next = async (lang, ns) => {
    const i18nInstance = createInstance();
    await i18nInstance
        .use(initReactI18next)
        .use(
            resourcesToBackend(
                async (language, namespace) => {
                    console.log(language, 'language')
                    if(language === fallbackLng) {
                        return {};
                    }
                    let translates = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/file-translates/${language}/${filesNames[namespace]}`, { next: { revalidate: 50 }});
                    translates = await translates.json();
                    return translates;
                }
            ),
        )
        .init(getOptions(lang, ns));

    return i18nInstance;
};

// It will accept the locale and namespace for i18next to know what file to load
export async function createTranslation(lang, ns) {
    const i18nextInstance = await initI18next(lang, ns);

    return {
        // This is the translation function we'll use in our components
        // e.g. t('greeting')
        t: i18nextInstance.getFixedT(lang, Array.isArray(ns) ? ns[0] : ns),
    };
}
