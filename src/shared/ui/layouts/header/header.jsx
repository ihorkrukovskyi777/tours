import Link from "next/link";
import Logo from './logo';
import {getHrefLocale} from "@/i18n/get-href-locale";
import styles from '@/shared/ui/layouts/header/style.module.css'

export default async function Header({locale}) {
    console.log(locale)
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/page/url-locale/all-cities?locale=${locale}`, { next: {revalidate: 60 * 5}} );
    const pageAllCities = await response.json();
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.flex}>
                    <Link prefetch={false} href={getHrefLocale(pageAllCities.locale, pageAllCities.slug)}><Logo/></Link>
                </div>
            </div>
        </header>
    );
}

