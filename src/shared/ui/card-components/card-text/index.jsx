import styles from './style.module.css'

export default function CardText({children , title}) {
    return (
        <div className={styles.block_wrap}>
            <div className={styles.text_wrapper}>
                <h3 className={styles.block_title}>{title}</h3>
                <div className={styles.block_text}>{children}</div>
            </div>
        </div>  
    )
}