import Image from 'next/image';
import DefaultImage from '@/assets/images/default-image.jpeg';
import styles from './style.module.css';

export default function Banner({image = DefaultImage , title , children ,  bottomView = null , size}) {

    const url = Math.random() < 0.5 ? 'https://imagedelivery.net/xtVVrgn04XP6bhrBt0jaJQ/3136875f-baa5-49ae-5448-c799e7996600/390x250' : 'https://imagedelivery.net/xtVVrgn04XP6bhrBt0jaJQ/80d69f71-c888-4c38-ea5b-89fde6e5a700/public';
  return (
    <section className={styles.banner}>
      <div className={size}>
          <Image
              className={styles.banner_bg}
              quality={50}
              width={1200}
              height={1200}
              src={url}
              alt="Picture of the author"
          />
          <div className="container">
            <div className="intro">
                <h1 className={styles.title}>{title}</h1>
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
