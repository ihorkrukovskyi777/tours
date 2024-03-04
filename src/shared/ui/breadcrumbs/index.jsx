import Link from "next/link";
import {getHrefLocale} from "@/i18n/get-href-locale";
import {Fragment} from "react";
import './style.css';

export default async function Breadcrumbs({locale, pages}) {
    return (
        <div className='breadcrumbs'>
            <div className='container'>
                <p id="breadcrumbs">
                      <span>
                          <span>
                              {pages.map((page, index) => {
                                  if (pages.length - 1 > index) {
                                      return (
                                          <Fragment key={index}>
                                              <Link
                                                  prefetch={false}
                                                  className="first_link"
                                                  href={getHrefLocale(locale, page.slug)}
                                              >
                                                  {page.title}
                                              </Link>
                                              <span className="arrow-right-b" style={{marginRight: pages.length === 3 && index === 0 ? '8px' : '0'}}> {index+2 === pages.length ? '›' : '-'} </span>
                                          </Fragment>
                                      )

                                  }

                                  return (
                                      <span key={index}>
                                            <span className="breadcrumb_last" aria-current="page">{page.title}</span>
                                      </span>
                                  )

                              })}

                          </span>
                      </span>
                </p>
            </div>
        </div>
    )
}
