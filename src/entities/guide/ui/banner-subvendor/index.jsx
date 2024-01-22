import Image from 'next/image';
import DefaultImage from '@/assets/images/default-image.jpeg';
import IcloudImage from "@/shared/ui/icloud-image";
import styles from './style.module.css';

export default function BannerSubVendor({image = DefaultImage , name , children, avatar }) {
  return (
    <section className="banner_subvendor">
      <Image className={styles.banner_bg} src={DefaultImage} alt="Picture of the author" />
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
