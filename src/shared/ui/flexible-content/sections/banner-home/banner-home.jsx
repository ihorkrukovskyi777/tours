import DropdownSearch from '@/entities/tours/ui/dropdown-search-tour';
import Banner from 'src/shared/ui/banner';
import LocationSvg from '@/assets/images/svg/location-svg';
import {fetchFlexibleContent} from "@/shared/api/flexible-content";
import './style.css';

export default async function BannerHome({locale, id, index, flexibleKey}) {
    const data = await fetchFlexibleContent(id, locale, flexibleKey, index)
    console.log(data, 'data')
    return (
        <Banner nameBanner="home_banner">
            <DropdownSearch/>
            <p className="link">
                <LocationSvg/>
                <a target="_self" href="/all-cities"> See all Cities </a>
            </p>
        </Banner>

    )
}
