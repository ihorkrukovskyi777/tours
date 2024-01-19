import BannerSubVendor from 'src/entities/guide/ui/banner-subvendor';
import LanguageImages from 'src/shared/ui/languages/language-images';
import DefaultImage from '@/assets/images/languages/USUKflag.jpg';
import FullStarSvg from '@/assets/images/svg/full-star';
import './style.css';

const languagesAll = [DefaultImage , DefaultImage]
export default function BannerGuide({title}) {

  return (
    <BannerSubVendor title={title} >
          <div className="rate_box">
              <FullStarSvg />
              <span>4.91 (65)</span>
         </div>
         <LanguageImages data={languagesAll} />
    </BannerSubVendor>
  )
}
