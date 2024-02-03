import {fetchFlexibleContent} from "@/shared/api/flexible-content";
import Faqs from "@/shared/ui/faqs/faqs";
import FaqSchema from "@/shared/schema/faq";

export default async function FaqSection({locale, id, index, flexibleKey}) {
    const questions = await fetchFlexibleContent(id, locale, flexibleKey, index, 60*5)
    if (!Array.isArray(questions)) {
        return null
    }
    return (
        <>
            <FaqSchema questions={questions} />
            <Faqs questions={questions}/>
        </>
    )
}
