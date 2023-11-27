import Image from 'next/image';
import DefaultImage from '@/assets/images/default-image.jpeg';
import styles from './style.module.css';

export default function Banner({image = DefaultImage , title , children ,  bottomView = null , size}) {
  return (
    <section className={styles.banner}>
      <div className={size}>
          <Image className={styles.banner_bg} src={image} alt="Picture of the author" />
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
