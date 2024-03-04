import IcloudImage from '@/shared/ui/icloud-image';
import DefaultImage from '@/assets/images/default-image.jpeg';
import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";
import Image from 'next/image';
import './style.css';


export default async function BannerBlog({locale, title , image=""}) {
    const i18n = await useDefaultI18n(locale);
    return (
        <section className='top-banner-blog'>
            <div className='container'>
                {image.src ?
                    <IcloudImage src={image.src} width={1920} height={550} alt={image.alt ? image.alt : 'image'} />
                    : <Image width={1920} height={550} src={DefaultImage} alt='111' />
                }
                <h1 className='top-banner-text'>{title ? title : i18n.t('Blog Page')}</h1>
            </div> 
        </section>
    )
}

