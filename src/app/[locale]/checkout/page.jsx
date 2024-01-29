import ChangeOfLanguage from "@/shared/ui/languages/change-of-language/change-of-language";
import Checkout from "@/entities/checkout/main";
import Footer from "@/shared/ui/layouts/footer/footer";
import TourRow from "@/widgets/tour-row/tour-row";
import {notFound} from "next/navigation";

export default async function CheckoutPage({params: {locale}, searchParams}) {
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
            <Checkout title={currentPage?.title}/>
            <TourRow id={3948} locale={locale} title={'Other Tours in London\n'}/>
            <ChangeOfLanguage languages={page.languages}/>
            <Footer />
        </>
    )
}