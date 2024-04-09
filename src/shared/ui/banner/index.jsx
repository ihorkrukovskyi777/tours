import IcloudImage from "@/shared/ui/icloud-image";
import './style.css';
export default function Banner({headMobile= null, attachment = null, title, children, bottomView = null, size , nameBanner='', isMobile = false}) {
    const [width, height] = isMobile ? [430, 430] : [1900, 1200]
    return (
        <section className={`banner ${nameBanner} ${headMobile ? 'head_mobile' : ''}`}>
            {headMobile ?
                <div className="banner_head_mobile">{headMobile}</div>
            : null}
            <div className={size}>
                 <IcloudImage
                    priority={true}
                    className="banner_bg"
                    width={width}
                    height={height}
                    isMobile={isMobile}
                    size={ isMobile ? '500x500' : 'public'}
                    src={attachment?.src}
                    alt={attachment?.alt}
                />
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
