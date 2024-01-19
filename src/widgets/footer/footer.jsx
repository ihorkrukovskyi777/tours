import Link from "next/link";
import Socials from '@/shared/ui/socials/socials';
import styles from '@/widgets/footer/style.module.css'
import {fetchFooterMenu} from "@/shared/api";
import {getHrefLocale} from "@/i18n/get-href-locale";

export default async function Footer({locale}) {

    const menuItems = await fetchFooterMenu(locale);

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.wrapper}>
                    <ul className={styles.footer_menu}>
                        {
                            menuItems?.map(menu => (<Link key={menu.slug} prefetch={false} href={getHrefLocale(menu.locale, menu.slug)}>{menu.title || ''}</Link>))
                        }
                    </ul>
                    <Socials/>

                </div>
            </div>
        </footer>
    );
}

