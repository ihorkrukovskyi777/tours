'use client'
import styles from './style.module.css';
import classNames from "classnames";
export default function CounterNumbers({startNumber= 1, onChange = () => {}, maxDisabled = false, minDisabled = false, minCount = 1}) {
 function update(event) {
    if(event.type === 'increment' && !maxDisabled) {
        onChange(startNumber + 1)
    }
    if(event.type === 'decrement' && !minDisabled) {
        if(startNumber > minCount) {
            onChange(startNumber - 1)
        }

    }
  }


  return (
    <div className={styles.counter_wrap}>
        <div className={styles.wrap}>
            <div className={styles.minus} onClick={() => update({type: 'decrement'})}>
                <span className={minDisabled ? styles.disabled : ''}></span>
            </div>
            <span className={styles.number} >{startNumber}</span>
            <div className={styles.plus} onClick={() => update({type: 'increment'})}>
                <span className={classNames(styles.horizontal, maxDisabled ? styles.disabled : '')}></span>
                <span className={classNames(styles.vertical, maxDisabled ? styles.disabled : '')}></span>
            </div>
        </div>
    </div>
  );
}

