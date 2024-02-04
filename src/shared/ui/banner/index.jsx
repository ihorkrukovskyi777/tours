import IcloudImage from "@/shared/ui/icloud-image";
import './style.css';

export default function Banner({attachment = null, title, children, bottomView = null, size , nameBanner='', isMobile = false}) {
    const [width, height ] = isMobile ? [430, 430] : [1200, 1200]
    return (
        <section className={`banner ${nameBanner}`}>
            <div className={size}>
                 <IcloudImage
                    priority={true}
                    className="banner_bg"
                    quality={10}
                    width={width}
                    height={height}
                    size={ isMobile ? '500x500' : 'public'}
                    src={attachment.src}
                    alt={attachment.alt}
                />
                <div className="container">
                    <div className="intro">
                        <span style={{color: '#fff'}}>{isMobile ? 'mobile' : 'desktop'}</span>
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
