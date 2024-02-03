import Image from 'next/image';
import styles from '../socials/style.module.css';
import InstagramIcon  from '@/assets/images/svg/instagram.svg'
import FacebookIcon  from '@/assets/images/svg/facebook.svg'

export default function Socials() {
  return (
    <ul className={styles.social}>
        <a className={styles.url} href="https://www.facebook.com/StrawberryToursENG" target="_blank">
            <Image src={FacebookIcon} alt='facebook' />
        </a>
        <a className={styles.url} href="https://www.instagram.com/StrawberryTours/" target="_blank">
            <Image src={InstagramIcon} alt="instagram" />
        </a>
    </ul>
  );
}

