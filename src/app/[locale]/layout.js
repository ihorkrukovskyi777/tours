import Header from '@/shared/ui/layouts/header/header'
import '../../globals.css'

export default function LocaleLayout({children, params}) {
    return (
        <main className={'main_flex_container'}>
            <Header locale={params.locale}/>
            {children}
        </main>
    )
}
