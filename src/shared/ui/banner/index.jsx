import IcloudImage from "@/shared/ui/icloud-image";
import './style.css';

export default function Banner({attachment = null, title, children, bottomView = null, size , nameBanner=''}) {
    return (
        <section className={`banner ${nameBanner}`}>
            <div className={size}>
                {attachment ? <IcloudImage
                    className="banner_bg"
                    quality={50}
                    width={1200}
                    height={1200}
                    src={attachment.src}
                    alt={attachment.alt}
                /> : null }
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
