import ClientHeader from "@/shared/ui/layouts/header/client-header";
import styles from '@/shared/ui/layouts/header/style.module.css'

export default async function Header({locale}) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/page/url-locale/all-cities?locale=${locale}`, { next: {revalidate: 60 * 5}} );
    const pageAllCities = await response.json();

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.flex}>
                    <ClientHeader  pageAllCities={pageAllCities}/>
                </div>
            </div>
        </header>
    );
}

