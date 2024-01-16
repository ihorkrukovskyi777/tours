import Link from "next/link";
import {useRouter} from "next/navigation";
import FlagsComponents from "@/shared/ui/flags";

export default function LanguagesSite({children, slug, code}) {
    const router = useRouter();


    const handleLocaleChange = (newLocale, slug) => router.push(`/${newLocale}/${slug}`);


    return (
        <li className="language">
            <Link
                href={`/${code}/${slug}`}
                prefetch={false}
                onClick={(event) => {
                    event.preventDefault();
                    handleLocaleChange(code, slug)
                }}
            >
                <span className="wrap-txt">{children}</span>
                <FlagsComponents locale={code}/>
            </Link>
        </li>

    );
}
