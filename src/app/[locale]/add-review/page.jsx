import i18n from "@/i18n/server-locales";
import Footer from "@/shared/ui/layouts/footer/footer";
import I18nChangeOfLanguage from "@/shared/ui/languages/change-of-language/i18n-change-of-language";
import FormReview from "@/entities/add-review/ui/form";
import './style.css'
export default async function Page({params: {locale}}) {
    const data = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/page/type/add-review?locale=${locale}`,
        {next: {revalidate: 0}}
    )
    const pageData = await data.json();

    await i18n.getFetchDefault()
    return (
        <div>
            <div className="content">
                <div className="container">
                    <FormReview pageData={pageData} i18n={{send: i18n.t('Send')}}/>
                </div>
            </div>

            <I18nChangeOfLanguage
                locale={locale}
                languages={pageData.languages?.map(item => ({...item, title: 'Free Tours'}))}
            />
            <Footer locale={locale}/>
        </div>
    )
}