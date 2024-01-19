import Image from 'next/image';
import IcloudImage from "@/shared/ui/icloud-image";
import DefaultImage from '@/assets/images/default-image.jpeg';
import './style.css';

export default function Banner({attachment = null, title, children, bottomView = null, size , nameBanner=''}) {

    return (
        <section className={`banner ${nameBanner}`}>
            <div className={size}>
                {attachment ?
                    <IcloudImage
                        className="banner_bg"
                        quality={50}
                        width={1200}
                        height={1200}
                        src={attachment.src}
                        alt={attachment.alt}
                    /> :
                    <Image src={DefaultImage} width={1920} height={560} alt='banner' className='banner_bg' />}
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
