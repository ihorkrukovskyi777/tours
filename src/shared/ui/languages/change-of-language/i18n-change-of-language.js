import ChangeOfLanguage from "@/shared/ui/languages/change-of-language/change-of-language";
import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";

export default async function I18nChangeOfLanguage({locale, title, addQueries = false, ...props}) {
    console.log(props)
    const i18n = await useDefaultI18n(locale)
    return (
        <ChangeOfLanguage
            {...props}
            addQueries={addQueries}
            title={title}
            i18n={{
                load_more: i18n.t('Load More'),
                free_tour_tour_language: i18n.t('Free Tours in Your Language')
            }}
        />
    )
}