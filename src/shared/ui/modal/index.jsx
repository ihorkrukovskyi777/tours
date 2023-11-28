'use client'
import styles from './style.module.css';
import ClockSvg from '@/assets/images/svg/calendar-svg';


export default function Modal({title="Bogota Tour Calendar", children , size='large'}) {

  return (
    <div className={styles.modal-content}>
        <div className={styles.flex_wrap}>
            <div className={styles.item}>
                <div className={styles.calendar_body}>
                    <div className={styles.title}>
                        <div className={styles.title_text_step1}>
                            {title}
                        </div>
                        <div class="close-button"><ClockSvg /></div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    </div>
  );
}

