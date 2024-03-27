import DropdownSearch from '@/entities/city/ui/dropdown-search-tour';
import Banner from '@/shared/ui/banner';
import LocationSvg from '@/assets/images/svg/location-svg';
import {fetchFlexibleContent} from "@/shared/api/flexible-content";
import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";
import './style.css';

export default async function BannerHome({locale, id, index, flexibleKey, isMobile = false}) {
    const i18n = await useDefaultI18n(locale)
    const data = await fetchFlexibleContent(id, locale, flexibleKey, index, 60*60)

    if (!data) {
        return null
    }

    let image = isMobile ? data?.image?.mobileImage : data.image?.image;

    return (
        <Banner nameBanner="home_banner" title={data.title ?? ''} attachment={image} isMobile={false}>
            <DropdownSearch locale={locale} i18n={{where_are_you_going: i18n.t('Where Are You Going?')}}/>
            <p className="link">

                {data.button ?
                    <>
                        <LocationSvg/>
                        <a target="_self" href={data.button.url}>{data.button.title}
                        </a>
                    </> :
                    null}
            </p>
        </Banner>

    )
}
