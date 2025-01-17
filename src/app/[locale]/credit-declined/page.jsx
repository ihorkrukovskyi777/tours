
import Footer from "@/shared/ui/layouts/footer/footer";
import generateSeoPage from "@/shared/helpers/seo/generate-seo-page";
import Title from "@/shared/ui/paragraphs/title/title";
import OrderBookingCard from "@/shared/ui/card-components/order-booking-card/order-booking-card";


export default async function CreditDeclinedPage({params: {locale}}) {

    return (
        <>
            <div className="container">
                <div className="content">
                    <Title position={'center'} tag={'h1'} size={"small"}>Click on the links below to see full booking confirmation and manage your bookings. </Title>
                    <div className="grid gap_sm row_4 padding_xs">
                       <OrderBookingCard
                           id={1}
                           slug={'1'}
                           title={'1'}
                           locale={'en'}
                           checkoutSlug={'/'}
                           durationLabel={'label'}
                           hours={2}
                           minutes={'20'}
                           number_people={10}
                           day={'1'}
                           dayNum={10}
                           month={'March'}
                           year={2024}
                           time={'time'}
                       />
                    </div>


                </div>
            </div>
            <Footer locale={locale} resetCookies={false}/>
        </>
    )
}
export async function generateMetadata({ params : {locale} }) {
    const slug = 'credit-declined';

    return await generateSeoPage(slug, locale);
}