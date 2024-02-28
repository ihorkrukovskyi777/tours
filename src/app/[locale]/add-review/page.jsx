import i18n from "@/i18n/server-locales";
import Footer from "@/shared/ui/layouts/footer/footer";
import I18nChangeOfLanguage from "@/shared/ui/languages/change-of-language/i18n-change-of-language";
import FormReview from "@/entities/add-review/ui/form";
import {canYouAddAReview} from "@/entities/api";
import {notFound} from "next/navigation";
import './style.css'

export default async function Page({params: {locale, }, searchParams}) {
    const data = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/page/type/add-review?locale=${locale}`,
        {next: {revalidate: 0}}
    )
    const pageData = await data.json();

    await i18n.getFetchDefault()

    if(!searchParams.code) {
        notFound()
    }
    const canReview = await canYouAddAReview(searchParams.code, searchParams.rating)

    if(canReview?.status === 404) {
        return <p style={{color: 'red', margin: '20px auto 0 auto', textAlign: 'center'}}>{i18n.t('Booking not found')}</p>
    }
     else if (canReview === false) {
         return  <p style={{textAlign: 'center'}}>{pageData.already}</p>
    }
     else if (!searchParams?.rating || searchParams.rating > 5 || searchParams.rating < 1) {
         return <p style={{textAlign: 'center', color: 'red',}}>{i18n.t('Invalid rating')}</p>
    }
    return (
        <div>
            <div className="content">
                <div className="container">
                    <FormReview pageData={pageData} i18n={{send: i18n.t('Send')}} code={searchParams.code}/>
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