
import Footer from "@/shared/ui/layouts/footer/footer";
import generateSeoPage from "@/shared/helpers/seo/generate-seo-page";
import Congratulations from "@/widgets/congratulations";
import CongratulationCard from "@/shared/ui/card-components/congratulation-card/congratulation-card";

export default async function CongratulationsPage({params: {locale}}: any) {
    return (
        <>
            <div className="container">
                <div className="content">
                    <Congratulations
                        title={'Congratulations!'}
                        subTitle={'Use your credit now to book an unforgettable tour or save your 5USD credit for later — it’s your choice!'}>
                        <CongratulationCard title={'Paid Giza Pyramids Sphinx Tour'} url={'/'} />
                        <CongratulationCard title={'123'} url={'/'} sale={'- 5USD off!'} />
                        <CongratulationCard title={'123'} url={'/'} />
                    </Congratulations>
                </div>
            </div>

            <Footer locale={locale} resetCookies={false}/>
        </>
    )
}
export async function generateMetadata({ params : {locale} }: any) {
    const slug = 'congratulations';

    // @ts-ignore
    return await generateSeoPage(slug, locale);
}