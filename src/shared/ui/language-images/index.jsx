import Image from "next/image"
import styles from './style.module.css'
export default function LanguageImages({data}) {  
    return (    
        <div className="flags_wrap">     
            {data.map((item , index) => {
                return (
                    <div key={index} className={styles.flag}>
                        <Image src={item} alt="icon" />
                    </div>  
                )
            })}
        </div>    
                         
  )
}