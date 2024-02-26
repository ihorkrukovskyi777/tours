import {allCitiesData} from "@/entities/api";
import Link from "next/link";
import i18n from "@/i18n/server-locales";
import './style.css';
export default async function AllCities({ locale }) {
    await i18n.getFetchDefault()
    const citiesAll = await allCitiesData(locale);
    return (
        <section className="all_cities">
            <div className="container">
                <h1>{i18n.t('See All Cities & Countries')}</h1>
                <div className='items'>
                    {citiesAll.map((country, index) => (
                        <div className='item' key={index}>
                            <div className='item_title'>{country.title ?? ''}</div>
                            <div className='item_cities'>
                                {country.cities.map((item) => {
                                    const locale = item.locale === 'en' ? '' : `/${item.locale}/`
                                    return <Link prefetch={false} href={`${locale}/${item.slug}`} key={item.title} ><span>{item.title}</span></Link>
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
