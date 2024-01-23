import Header from '@/shared/ui/layouts/header/header'
import Footer from "@/shared/ui/layouts/footer/footer";
import '../../globals.css'

export default function LocaleLayout({children, params}) {
    return (
        <main className={'main_flex_container'}>
            {/*<Header locale={params.locale}/>*/}
            {children}
            {/*<Footer locale={params.locale}/>*/}
        </main>
    )
}
