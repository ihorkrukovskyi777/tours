import Header from '@/shared/ui/layouts/header/header'
import '../../globals.css'

export default function LocaleLayout({children, params}) {

    return (
        <html lang={params.locale}>
        <body>
        <main className={'main_flex_container'}>
            <Header locale={params.locale}/>
            {children}
        </main>
        </body>
        </html>
    )
}
