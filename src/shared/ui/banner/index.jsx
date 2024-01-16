import Image from 'next/image';
import IcloudImage from "@/shared/ui/icloud-image";
import styles from './style.module.css';

export default function Banner({attachment = null, title, children, bottomView = null, size}) {

    return (
        <section className={styles.banner}>
            <div className={size}>
                {attachment ?
                    <IcloudImage
                        className={styles.banner_bg}
                        quality={50}
                        width={1200}
                        height={1200}
                        src={attachment.src}
                        alt={attachment.alt}
                    /> :
                    null}
                <div className="container">
                    <div className="intro">
                        <h1 className={styles.title} dangerouslySetInnerHTML={{__html: title}}></h1>
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
