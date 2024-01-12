'use client'
import styles from './style.module.css';

export default function CounterNumbers({startNumber= 1, onChange = () => {}}) {
 function update(event) {
    if(event.type === 'increment') {
        onChange(startNumber + 1)
    }
    if(event.type === 'decrement') {
        startNumber > 2 ? onChange(startNumber - 1) : onChange(1);
    }
  }


  return (
    <div className={styles.counter_wrap}>
        <div className={styles.wrap}>
            <div className={styles.minus} onClick={() => update({type: 'decrement'})}><span></span></div>
            <span className={styles.number}>{startNumber}</span>
            <div className={styles.plus} onClick={() => update({type: 'increment'})}>
                <span className={styles.horizontal}></span>
                <span className={styles.vertical}></span>
            </div>
        </div>
    </div>
  );
}

