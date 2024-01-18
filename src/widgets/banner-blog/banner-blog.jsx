import IcloudImage from '@/shared/ui/icloud-image';

import './style.css';

export default async function BannerBlog({title , image=""}) {
    return (
        <section className='top-banner-blog'>
            <div className='container'>
                {image.src ? <IcloudImage src={image.src} width={1920} height={550} alt={image.alt ? image.alt : 'image'} /> : null}
                <h1 className='top-banner-text'>{title}</h1>
            </div> 
        </section>
    )
}

