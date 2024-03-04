import TextAndSlider from "@/widgets/text-and-slider";
import {getTextAndSlides} from "@/entities/api";
import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";
export default async function TextAndSliderTourPage({ id, locale, isMobile }) {
    const i18n = await useDefaultI18n(locale)
    const repeater = await getTextAndSlides(id, locale);
    return (
        <TextAndSlider i18n={{ book_now: i18n.t('Book Now')}} title={repeater.title ?? ''} isMobile={isMobile} attachments={repeater.attachments} listText={repeater.texts} />
    )
}
