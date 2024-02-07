import TextAndSlider from "@/widgets/text-and-slider";
import {getTextAndSlides} from "@/entities/tour/api";
import i18n from "@/i18n/server-locales";
export default async function TextAndSliderTourPage({ id, locale, isMobile }) {
    await i18n.getFetchDefault()
    const repeater = await getTextAndSlides(id, locale);
    return (
        <TextAndSlider i18n={{ book_now: i18n.t('Book Now')}} title={repeater.title ?? ''} isMobile={isMobile} attachments={repeater.attachments} listText={repeater.texts} />
    )
}
