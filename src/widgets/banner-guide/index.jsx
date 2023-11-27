import BannerSubvendor from '@/shared/ui/banner-subvendor';
import LanguageImages from '@/shared/ui/language-images';
import DefaultImage from '@/assets/images/languages/USUKflag.jpg';
import FullStarSvg from '@/assets/images/svg/full-star';
import './style.css';

const languagesAll = [DefaultImage , DefaultImage]
export default function BannerGuide({title}) {

  return (
    <BannerSubvendor title={title} >
          <div className="rate_box">
              <FullStarSvg /> 
              <span>4.91 (65)</span>  
         </div>
         <LanguageImages data={languagesAll} />
    </BannerSubvendor>
  )
}
