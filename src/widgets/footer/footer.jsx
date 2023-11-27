import Socials from '@/shared/ui/socials/socials';
import styles from '@/widgets/footer/style.module.css'


export default function Footer() {
  return (
    <footer className={styles.footer}>
        <div className="container">
            <div className={styles.wrapper}>
                <ul className={styles.footer_menu}>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">Legal</a></li>
                </ul>
                <Socials />
        
            </div>
        </div>
    </footer>  
  );
}

