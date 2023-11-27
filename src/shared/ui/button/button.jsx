'use client';
import styles from './style.module.css';
import Image from 'next/image'; 

export default function Button({children , icon = null , onClick= () => {} , prevent=false }) {
    return (
        <button className={styles.button_custom} 
            onClick={ (e) => {
                if(prevent) {
                    e.preventDefault();
                }
                    onClick();
                }     
            }
        >
            {children}
            {icon ? <Image src={icon} alt='icon' /> : null}
        </button>
  )
}
