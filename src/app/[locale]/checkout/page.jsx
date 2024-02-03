import ChangeOfLanguage from "@/shared/ui/languages/change-of-language/change-of-language";
import Checkout from "@/entities/checkout/main";
import Footer from "@/shared/ui/layouts/footer/footer";
import TourRow from "@/widgets/tour-row/tour-row";
import {createTranslation} from "@/i18n/server";
import {notFound} from "next/navigation";


export default async function CheckoutPage({params: {locale}, searchParams}) {
    const { t } = await createTranslation(locale)
    let checkoutData = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS}/wp-json/oneport/v1/checkout/${searchParams.code}?locale=${locale}`,
        {next: {revalidate: 0}}
    )
    checkoutData = await checkoutData.json();

    if(checkoutData?.data?.status === 404) {
        notFound();
    }
    const pageType = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/page/type/checkout?locale=${locale}`,
        {next: {revalidate: 0}}
    )

    const page = await pageType.json();
    if (page.statusCode === 404 || typeof page.id !== 'number') {
        notFound();
    }
    const currentPage = page.languages.find(item => item.locale === locale);

    return (
        <>
            <Checkout title={currentPage?.title} locale={locale} tourLocale={checkoutData.locale}/>
            <TourRow id={checkoutData.tour_id} locale={locale} title={`${t('Other Tours in')} ${checkoutData.city?.post_title}`}/>
            <ChangeOfLanguage languages={page.languages}/>
            <Footer />
        </>
    )
}

export async function generateMetadata() {

    return {
        robots: {index: false, follow: false},
    }
}