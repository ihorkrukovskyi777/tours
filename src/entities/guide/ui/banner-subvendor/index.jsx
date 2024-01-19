import Image from 'next/image';
import DefaultImage from '@/assets/images/default-image.jpeg';

import styles from './style.module.css';

export default function BannerSubVendor({image = DefaultImage , title , children }) {
  return (
    <section className="banner_subvendor">
      <Image className={styles.banner_bg} src={DefaultImage} alt="Picture of the author" />
      <div className="container">
          <div className={styles.wrapper}>
            <div className={styles.img_box}>
              <Image className={styles.img_subvendor} src={image} alt="Picture of the author" />
            </div>
            <div className={styles.text_box}>
                <h1 className={styles.title}>{title}</h1>
                {children}
            </div>
          </div>
      </div>
    </section>
  )
}
