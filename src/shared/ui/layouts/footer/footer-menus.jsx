'use client'
import {useRouter , usePathname} from "next/navigation";
import {getHrefLocale} from "@/i18n/get-href-locale";
import {locales} from "@/i18n/settings";


const styles = {
    cursor: 'pointer',
}
export default function FooterMenus({ menuItems }) {

    const router = useRouter();
    const pathname = usePathname();

    const links = locales.find(locale =>  {
        if(locale === 'en')
            return pathname === '/';

        return pathname === `/${locale}`
    }) ? menuItems : menuItems.slice(0, 1)
    return (
        <>


            {links?.map((menu) => (
                    <li
                        style={styles}
                        key={menu.slug}
                        onClick={() => {
                            if (window?.bugPageRoute) {
                                window.location.href = getHrefLocale(menu.locale, menu.slug);
                            } else {
                                router.push(getHrefLocale(menu.locale, menu.slug));
                            }
                        }}
                    >
                        {menu.title || ""}
                    </li>
                ))
            }
        </>
    )
}