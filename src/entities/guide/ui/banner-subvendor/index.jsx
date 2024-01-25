import IcloudImage from "@/shared/ui/icloud-image";
import styles from './style.module.css';

export default function BannerSubVendor({attachment = null, name, children, avatar, isMobile = false}) {
    const [width, height] = isMobile ? [430, 430] : [1200, 1200]
    return (
        <section className="banner_subvendor">
            <IcloudImage className={styles.banner_bg} src={attachment?.src} alt={attachment?.alt} width={width}
                         height={height}/>
            <div className="container">
                <div className={styles.wrapper}>
                    <div className={styles.img_box}>
                        <IcloudImage src={avatar} width={240} height={240}></IcloudImage>
                    </div>
                    <div>
                        <h1 className={styles.title}>{name}</h1>
                        {children}
                    </div>
                </div>
            </div>
        </section>
    )
}
