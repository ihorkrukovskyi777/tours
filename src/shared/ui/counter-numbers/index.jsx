'use client'
import styles from './style.module.css';
import { useState } from 'react';

export default function CounterNumbers({startNumber=1}) {
 const [conter , setCounter] = useState(startNumber)   
 function update(event) {
    if(event.type === 'increment') {
        setCounter(conter + 1)
    }
    if(event.type === 'decrement') {
        conter > 2 ? setCounter(conter - 1) : setCounter(1);
    } 
  }   
  return (
    <div className={styles.counter_wrap}>
        <div className={styles.wrap}>
            <div className={styles.minus} onClick={() => update({type: 'decrement'})}><span></span></div>
            <span className={styles.number}>{conter}</span>
            <div className={styles.plus} onClick={() => update({type: 'increment'})}>
                <span className={styles.horizontal}></span>
                <span className={styles.vertical}></span>
            </div>
        </div>
    </div>
  );
}

