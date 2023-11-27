import PropTypes from 'prop-types';
import Logo from './logo';
import styles from '@/widgets/header/style.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
        <div className="container">
            <div className={styles.flex}>
                 <a href="/"><Logo /></a>    
            </div>
        </div>
    </header>  
  );
}

