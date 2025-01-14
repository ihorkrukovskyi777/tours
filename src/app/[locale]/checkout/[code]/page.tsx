import CheckoutView from "@/bokun-widget/src/checkout/views/checkout.view";
import {FetchBokunIntegration} from "@/bokun-widget/src/api/fetch-bokun-integration";
import {NotFoundException} from "@/bokun-widget/src/api/exception";
import useWidgetTranslate from "@/i18n/useWidgetTranslate";
import I18nChangeOfLanguage from "@shared/ui/languages/change-of-language/i18n-change-of-language";

interface Props {
    locale: string
    code: string
}

const Page = async ({params}: Props) => {
    const pageType = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/page/type/checkout?locale=${params.locale}`,
        {next: {revalidate: 0}}
    )


    const page = await pageType.json();
    const fetchApi = await new FetchBokunIntegration(params.locale)
    const i18n = await useWidgetTranslate(params.locale)
    const checkout = await fetchApi.getCheckoutInformation(params.code).catch(err => {
        if (err instanceof NotFoundException) {
            notFound()
        }
    })

    const d = (d: string) => d

    return (
        <>
            <CheckoutView
                locale={params.locale}
                checkout={checkout}
                i18n={{
                    widget: i18n,
                    pickup: 'pickup',
                    time: 'time',
                    tour: d('tour'),
                    discount: d('discount'),
                    bookingConfirmation: d('bookingConfirmation'),
                    bookingId: d('bookingId'),
                    firstName: d('firstName'),
                    lastName: d('lastName'),
                    email: d('email'),
                    phoneNumber: d('phoneNumber'),
                    date: d('date'),
                    duration: d('duration'),
                    'drop-off': d('drop-off'),
                    pickup: d('pickup'),
                    travelDocuments: d('travelDocuments'),
                    invoice: d('invoice'),
                    refund: d('refund'),
                    orderSummary: d('orderSummary'),
                    showMore: d('showMore'),
                    bookingTotal: d('bookingTotal'),
                    paid: d('paid'),
                    cancel: d('cancel'),
                }}
            />
            <I18nChangeOfLanguage filterQuery={['open_contact_modal']} locale={params.locale} languages={page.languages} addQueries={true}/>
        </>
    )
}

export default Page