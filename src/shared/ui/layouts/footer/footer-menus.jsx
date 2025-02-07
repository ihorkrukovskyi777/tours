'use client'
import {useRouter , usePathname} from "next/navigation";
import {getHrefLocale} from "@/i18n/get-href-locale";



const styles = {
    cursor: 'pointer',
}
export default function FooterMenus({ menuItems }) {
    const router = useRouter();
    const pathname = usePathname();
    const hideLegalPage = 1
    return (
        <>

            {pathname === '/' &&
                menuItems?.map((menu) => (
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

            {pathname !== '/' &&
                menuItems?.map((menu, index) =>
                    index !== hideLegalPage && (
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
                    )
                )
            }
        </>
    )
}