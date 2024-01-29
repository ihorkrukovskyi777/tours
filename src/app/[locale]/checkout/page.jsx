import OtherTours from "@/widgets/other-tours";
import ChangeOfLanguage from "@/shared/ui/languages/change-of-language/change-of-language";
import Checkout from "@/entities/checkout/main";
import {notFound} from "next/navigation";

export default async function CheckoutPage({params: {locale}}) {
    const pageType = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/page/checkout`,
        {next: {revalidate: 60}}
    )
    const page = await pageType.json();
    if (page.statusCode === 404 || typeof page.id !== 'number') {
        notFound();
    }

    console.log(page, 'data')
    return (
        <>
            <Checkout/>
            <OtherTours/>
            <ChangeOfLanguage languages={page.languages}/>
        </>
    )
}