'use client'
import {useRouter} from "next/navigation";
import {getHrefLocale} from "@/i18n/get-href-locale";

const styles = {
    cursor: 'pointer',
}
export default function FooterMenus({ menuItems }) {
    const router = useRouter()
    return (
        <>
            {menuItems?.map((menu) => (
                <li
                    style={styles}
                    key={menu.slug}
                    onClick={() => { router.push(getHrefLocale(menu.locale, menu.slug))}}
                >
                    {menu.title || ""}
                </li>
            ))}
        </>
    )
}