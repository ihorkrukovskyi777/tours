import Link from "next/link";
import {createTranslation} from "@/i18n/server";
import {getHrefLocale} from "@/i18n/get-href-locale";
import './style.css';

export default async function Breadcrumbs({title, locale}) {
    const {t} = await createTranslation();
    return (
        <div className='breadcrumbs'>
            <div className='container'>
                <p id="breadcrumbs">
                      <span>
                          <span>
                              <Link prefetch={false} className="first_link"
                                    href={getHrefLocale(locale, '/')}>{t('Free Tour')}</Link>
                              <span className="arrow-right-b"> - </span>
                              <span>
                                  <span className="breadcrumb_last" aria-current="page">{title}</span>
                              </span>
                          </span>
                      </span>
                </p>
            </div>
        </div>
    )
}
