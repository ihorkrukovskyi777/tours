import {allCitiesData} from "@/entities/api";
import './style.css';
export default async function AllCities({ locale, title }) {
    const citiesAll = await allCitiesData(locale);
    return (
        <section className="all_cities">
            <div className="container">
                <h1>{title}</h1>
                <div className='items'>
                    {Object.keys(citiesAll).sort().map((key) => (
                        <div className='item' key={key}>
                            <div className='item_title'>{key}</div>
                            <div className='item_cities'>
                                {citiesAll[key].cities.map((item) => <a href={item.slug} key={item.title} ><span>{item.title}</span></a>)}
                            </div>
                        </div>
                    ))}
                </div>  
            </div>   
        </section>
    )
}
