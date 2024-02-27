import BannerSubVendor from '@/entities/guide/ui/banner-subvendor';
import LanguageImages from "@/shared/ui/languages/language-images";
import FullStarSvg from '@/assets/images/svg/full-star';
import {fetchBannerSubVendor} from "@/entities/guide/api";
import './style.css';

export default async function BannerGuide({id, isMobile}) {

    const {profile, rating, locales, attachment} = await fetchBannerSubVendor(id)

    return (
        <BannerSubVendor name={profile?.name} avatar={profile.avatar} attachment={attachment} isMobile={isMobile}>
            <div className="rate_box">
                {rating > 0 ? <FullStarSvg/> : null }
                {rating?.reviews ? <span>{rating.rating} ({rating.reviews})</span> : null}
            </div>
            <LanguageImages locales={locales}/>
        </BannerSubVendor>
    )
}
