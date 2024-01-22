import {fetchFlexibleContent} from "@/shared/api/flexible-content";
import Faqs from "@/shared/ui/faqs/faqs";

export default async function FaqSection({locale, id, index, flexibleKey}) {
    const questions = await fetchFlexibleContent(id, locale, flexibleKey, index, 60*5)
    if (!Array.isArray(questions)) {
        return null
    }
    return <Faqs questions={questions}/>
}
