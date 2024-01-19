import Link from "next/link";
import Logo from './logo';
import styles from '@/widgets/header/style.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
        <div className="container">
            <div className={styles.flex}>
                <Link prefetch={false} href="/"><Logo /></Link>
            </div>
        </div>
    </header>
  );
}

