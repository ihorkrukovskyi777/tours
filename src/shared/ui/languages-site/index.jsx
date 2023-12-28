//import PropTypes from 'prop-types';
import Image from "next/image";
import Link from "next/link";
import {useParams, usePathname, useRouter, useSelectedLayoutSegments} from "next/navigation";
import {locales} from "@/i18n/settings";

export default function LanguagesSite({children , url , img, code}) {
    const router = useRouter();
    const params = useParams();
    const urlSegments = useSelectedLayoutSegments();
    const path = usePathname();

    const handleLocaleChange = newLocale => {
        // This is used by the Header component which is used in `app/[locale]/layout.tsx` file,
        // urlSegments will contain the segments after the locale.
        // We replace the URL with the new locale and the rest of the segments.
        const newPath = path.split('/').filter(path => !locales.includes(path));

        router.push(`/${newLocale}/${newPath.join('/')}`);
    };

    console.log(url)
  return (
          <li className="language">
            <Link href={url+code} onClick={(event) => {
                event.preventDefault();
                handleLocaleChange(code)
            }}>
              <span className="wrap-txt">{children}</span>
              <Image src={img} alt="icon" />
            </Link>
          </li>

  );
}


// Languages.propTypes = {
//     languages: PropTypes.arrayOf(
//         PropTypes.shape({
//             url: PropTypes.string
//         })
//     )
// }
