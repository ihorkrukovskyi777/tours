import i18n from "@/i18n";
import ChangeOfLanguage from "@/shared/ui/languages/change-of-language/change-of-language";

export default async function I18nChangeOfLanguage({locale, title, ...props}) {
    await i18n.getFetchDefault();
    return (
        <ChangeOfLanguage
            {...props}
            title={i18n.t(title)}
            i18n={{
                load_more: i18n.t('Load More'),
                free_tour_tour_language: i18n.t('Free Tours in Your Language')
            }}
        />
    )
}