'use client'
import Image from 'next/image';
import InstagramIcon from '@/assets/images/svg/instagram.svg'
import FacebookIcon from '@/assets/images/svg/facebook.svg'
import styles from '../socials/style.module.css';

export default function Socials() {
    return (
        <ul className={styles.social}>
            <li
                className={styles.url}
                onClick={() => {
                    window.open('https://www.facebook.com/StrawberryToursENG', '_blank').focus()
                }}
            >
                <Image src={FacebookIcon} alt='facebook'/>
            </li>
            <li
                className={styles.url}
                onClick={() => {
                    window.open('https://www.instagram.com/StrawberryTours/', '_blank').focus()
                }}
            >
                <Image src={InstagramIcon} alt="instagram"/>
            </li>
        </ul>
    );
}

