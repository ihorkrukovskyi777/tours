import Footer from "@/shared/ui/layouts/footer/footer";
import generateSeoPage from "@/shared/helpers/seo/generate-seo-page";
import Title from "@/shared/ui/paragraphs/title/title";
import CongratulationCard from "@/shared/ui/card-components/congratulation-card/congratulation-card";


export default async function AccountCreatedPage({params: {locale}}) {
    return (
        <>
            <div className="container padding_xs">
                <div className="content">
                    <Title>Paid Tours in London</Title>
                    <div className="grid gap_sm row_3">
                        <CongratulationCard title={'Congratulations!'} url={''} />
                        <CongratulationCard title={'Congratulations!'} url={''} />
                        <CongratulationCard title={'Congratulations!'} url={''} />
                    </div>
                </div>
            </div>

            <Footer locale={locale} resetCookies={false}/>
        </>
    )
}
export async function generateMetadata({ params : {locale} }) {
    const slug = 'account-created';

    return await generateSeoPage(slug, locale);
}