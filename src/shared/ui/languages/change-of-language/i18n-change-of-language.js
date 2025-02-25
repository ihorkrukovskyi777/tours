import ChangeOfLanguage from "@/shared/ui/languages/change-of-language/change-of-language";
import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";

export default async function I18nChangeOfLanguage({locale, free_tour_tour_language = '', title, addQueries = false, ...props}) {
    const i18n = await useDefaultI18n(locale)
    return (
        <ChangeOfLanguage
            {...props}
            addQueries={addQueries}
            title={title}
            parentLocale={locale}
            i18n={{
                load_more: i18n.t('Load More'),
                free_tour_tour_language: free_tour_tour_language || i18n.t('Free Tours in Your Language')
            }}
        />
    )
}