import BokunPagePaid from "@/app/[locale]/[slug]/paid/widget-bokun.view";
import {Ii18n} from "@/bokun-widget/src/common/i18n.type";
import useWidgetTranslate from "@/i18n/useWidgetTranslate";
// @ts-ignore
const PaidPage = async ({ params }) => {
    const i18n = await useWidgetTranslate(params.locale)
    return (
        <BokunPagePaid locale={params.locale} i18n={i18n as Ii18n} bokun_id={14056}/>
    )
}

export default PaidPage