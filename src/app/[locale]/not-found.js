import Footer from "@/shared/ui/layouts/footer/footer";
import {createTranslation} from "@/i18n/server";
import Link from "next/link";
export default async function page404() {
    const { t } = await createTranslation();
    return (
        <>
            <div>
                <div className="content">
                    <div className="container">
                        <article>
                            <p>{t('Nothing Found')}</p>
                            <h1>404</h1>
                            <p>{t('You can go back to the home page')}
                                <Link href="/">{t('HERE')}</Link>
                            </p>
                        </article>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}