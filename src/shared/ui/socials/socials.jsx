import Image from 'next/image';
import styles from '../socials/style.module.css';
import IntagramIcon  from '@/assets/images/svg/instagram.svg'
import FacebookIcon  from '@/assets/images/svg/facebook.svg'


export default function Socials() {
  return (
    <ul className={styles.social}>
        <a className={styles.url} href="#">
            <Image src={FacebookIcon} alt='facebook' />
        </a>
        <a className={styles.url} href="#">
            <Image src={IntagramIcon} alt="instagram" />
        </a>
    </ul>
  );
}

