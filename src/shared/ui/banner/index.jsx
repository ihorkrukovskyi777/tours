import IcloudImage from "@/shared/ui/icloud-image";
import BannerImage from "/public/images/background-image-banner.jpeg"
import Image from "next/image";
import './style.css';

export default function Banner({attachment = null, title, children, bottomView = null, size , nameBanner=''}, isMobile = false) {
    const [width, height ] = isMobile ? [430, 430] : [1200, 1200]
    return (
        <section className={`banner ${nameBanner}`}>
            <div className={size}>
                {attachment ? <IcloudImage
                    priority={true}
                    className="banner_bg"
                    quality={10}
                    width={width}
                    height={height}
                    src={attachment.src}
                    alt={attachment.alt}
                /> : null }
                <Image src={BannerImage} priority={true} alt={'banner'} className="banner_bg"/>
                <div className="container">
                    <div className="intro">
                        <h1 className="title" dangerouslySetInnerHTML={{__html: title || ''}}></h1>
                        <div className="wrapper">
                            {children}
                        </div>
                        {bottomView}
                    </div>
                </div>
            </div>
        </section>
    )
}
