import Footer from "@/shared/ui/layouts/footer/footer";
import i18n from "@/i18n";
import Link from "next/link";
export default async function page404() {
    await i18n.getFetchDefault()
    return (
        <>
            <div>
                <div className="content page-404">
                    <div className="container">
                        <article>
                            <p>{i18n.t('Nothing Found')}</p>
                            <h1>404</h1>
                            <p>
                                {i18n.t('You can go back to the home page')}
                                <Link href="/"> {i18n.t('HERE')}</Link>
                            </p>
                        </article>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}