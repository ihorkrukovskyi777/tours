import styles from './style.module.css'
import Image from 'next/image'


export default function CardGuide({children , img , url , bottomView}) {
    return (
        <a href={url} className={styles.item}>
            <div className={styles.text_wrapper}>
            <div className="img_box">
                <Image src={img} alt='img' />
            </div>
            {children}
            {bottomView}
            </div>
        </a>  
    )
}