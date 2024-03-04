import {fetchFlexibleContent} from "@/shared/api/flexible-content";
import Faqs from "@/shared/ui/faqs/faqs";
import FaqSchema from "@/shared/schema/faq";
import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";

export default async function FaqSection({locale, id, index, flexibleKey}) {
    const i18n = await useDefaultI18n(locale)

    const questions = await fetchFlexibleContent(id, locale, flexibleKey, index, 60*60)
    if (!Array.isArray(questions)) {
        return null
    }

    return (
        <>
            <FaqSchema questions={questions} />
            <Faqs questions={questions} i18n={{faq: i18n.t('Faq')}}/>
        </>
    )
}
