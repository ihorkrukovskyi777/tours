'use client';
import IcloudImage from '@/shared/ui/icloud-image';
import {useTranslation} from "@/i18n/client";
import DefaultImage from '@/assets/images/default-image.jpeg';
import Image from 'next/image';
import './style.css';


export default function BannerBlog({title , image=""}) {
    const { t } = useTranslation();
    return (
        <section className='top-banner-blog'>
            <div className='container'>
                {image.src ? <IcloudImage src={image.src} width={1920} height={550} alt={image.alt ? image.alt : 'image'} /> : <Image width={1920} height={550} src={DefaultImage} alt='111' />}
                <h1 className='top-banner-text'>{title ? title : t('blogTitle')}</h1>
            </div> 
        </section>
    )
}

