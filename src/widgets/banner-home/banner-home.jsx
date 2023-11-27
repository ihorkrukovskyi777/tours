import DropdownSearch from '@/entities/tours/ui/dropdown-search-tour';
import Banner from '@/shared/ui/banner';
import LocationSvg from '@/assets/images/svg/location-svg';
import './style.css';

export default function BannerHome({title , size}) {

  return (
    <Banner title={title} size={size} >
         <DropdownSearch />
         <p className="link"> 
            <LocationSvg />
            <a target="_self" href="/all-cities"> See all Cities </a>
          </p>
    </Banner>
   
  )
}
