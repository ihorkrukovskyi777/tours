import {allCitiesData} from "@/entities/api";
import Link from "next/link";
import i18n from "@/i18n";
import './style.css';
export default async function AllCities({ locale, title }) {
    await i18n.getFetch()
    const citiesAll = await allCitiesData(locale);
    return (
        <section className="all_cities">
            <div className="container">
                <h1>{i18n.t('See All Cities & Countries')}</h1>
                <div className='items'>
                    {Object.keys(citiesAll).sort().map((key) => (
                        <div className='item' key={key}>
                            <div className='item_title'>{key}</div>
                            <div className='item_cities'>
                                {citiesAll[key].cities.map((item) => {
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
