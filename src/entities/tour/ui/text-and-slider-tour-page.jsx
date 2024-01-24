import TextAndSlider from "@/widgets/text-and-slider";
import {getTextAndSlides} from "@/entities/tour/api";
export default async function TextAndSliderTourPage({ id, locale, isMobile }) {
    const repeater = await getTextAndSlides(id, locale);
    return (
        <TextAndSlider isMobile={isMobile} attachments={repeater.attachments} listText={repeater.texts} />
    )
}
