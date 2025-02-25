import CheckoutView from "@/bokun-widget/src/checkout/views/checkout.view";
import {FetchBokunIntegration} from "@/bokun-widget/src/api/fetch-bokun-integration";
import {NotFoundException} from "@/bokun-widget/src/api/exception";
import useWidgetTranslate from "@/i18n/useWidgetTranslate";
import I18nChangeOfLanguage from "@shared/ui/languages/change-of-language/i18n-change-of-language";
import {notFound} from "next/navigation";
import {getTranslations} from "next-intl/server";
import generateSeoPage from "@/shared/helpers/seo/generate-seo-page";
interface Props {
    locale: string
    code: string
}

// @ts-ignore
const Page = async ({params}: Props) => {

    const t = await getTranslations();
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
    // @ts-ignore
    const languages = page.languages.map(item => ({...item, slug: `${item.slug}/${params.code}`}))

    return (
        <>
            <CheckoutView
                locale={params.locale}
                // @ts-ignore
                checkout={checkout}
                i18n={{
                    widget: i18n,
                    tour: t('tour'),
                    time: t('time'),
                    discount: t('discount'),
                    bookingConfirmation: t('bookingConfirmation'),
                    bookingId: t('bookingId'),
                    firstName: t('firstName'),
                    lastName: t('lastName'),
                    email: t('email'),
                    phoneNumber: t('phoneNumber'),
                    date: t('date'),
                    duration: t('duration'),
                    'drop-off': t('drop-off'),
                    pickup: t('pickup'),
                    travelDocuments: t('travelDocuments'),
                    invoice: t('invoice'),
                    refund: t('refund'),
                    orderSummary: t('orderSummary'),
                    showMore: t('showMore'),
                    bookingTotal: t('bookingTotal'),
                    paid: t('paid'),
                    cancel: t('cancel'),
                }}
            />
            {/*@ts-ignore*/}
            <I18nChangeOfLanguage free_tour_tour_language={t('tours_in_your_language')} filterQuery={['open_contact_modal']} locale={params.locale} languages={languages} addQueries={true}/>
        </>
    )
}

export default Page

interface MetaDataProps {
    params: { locale: string }
}
export async function generateMetadata({params}: MetaDataProps ) {
    const title = {
        en: 'Checkout',

    }
    return {
        robots: {index: false, follow: false},
        // @ts-ignore
        title: title[params?.locale] ?? 'Checkout',
    }
}