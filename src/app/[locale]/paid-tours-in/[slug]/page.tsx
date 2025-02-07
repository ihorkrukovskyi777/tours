import Footer from "@/shared/ui/layouts/footer/footer";
import generateSeoPage from "@/shared/helpers/seo/generate-seo-page";
import Congratulations from "@/widgets/congratulations";
import CongratulationCard from "@/shared/ui/card-components/congratulation-card/congratulation-card";
import BaseModal from "@entities/paid-tour/ui/modals/base-modal/base-modal";
import './style.css'

export default async function CongratulationsPage({params: {locale}}: any) {




    return (
        <>
            <div className="container congratulations_page">
                <div className="content">
                    <Congratulations
                        title={'Paid Tours in London!'}
                        subTitle={''}
                    >
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