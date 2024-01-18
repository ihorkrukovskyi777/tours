import styles from './style.module.css'
// import Image from 'next/image'
import IcloudImage from '../icloud-image';
import FlagsComponents from "@/shared/ui/flags";

export default function CardGuide({children , avatar , url , bottomView = []}) {
    return (
        <a href={url} className={styles.item}>
            <div className={styles.text_wrapper}>
            <div className="img_box">
                {avatar ? <IcloudImage src={avatar} width={270} height={270} alt="brand logo" /> : null }
            </div>
            {children}
                <div className='flags_wrap'>
                    {bottomView.map((item , index) => <div key={index} className='flag'><FlagsComponents locale={item} alt={`flag ${item}`}  className='country-box-select'/></div> )}
                </div> 
            </div>
        </a>  
    )
}