import CheckoutView from "@/bokun-widget/src/checkout/views/checkout.view";
import {FetchBokunIntegration} from "@/bokun-widget/src/api/fetch-bokun-integration";
import {NotFoundException} from "@/bokun-widget/src/api/exception";
import useWidgetTranslate from "@/i18n/useWidgetTranslate";
interface Props {
    locale: string
    code: string
}
const Page = async ({locale, code}: Props) => {
    const fetch = await new FetchBokunIntegration(locale)
    const i18n = await useWidgetTranslate(locale)
    const checkout = await fetch.getCheckoutInformation(code).catch(err => {
        if (err instanceof NotFoundException) {
            // notFound()
        }
    })

    return (
        <CheckoutView locale={locale} checkout={checkout} i18n={{widget: i18n, pickup: 'pickup', }}/>
    )
}

export default Page