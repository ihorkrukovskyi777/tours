import Link from "next/link";
import IcloudImage from '../../icloud-image';
import FlagsComponents from "@/shared/ui/flags";
import styles from './style.module.css'
export default function CardGuide({children , avatar , url , bottomView = []}) {
    return (
        <Link href={url?.toLowerCase()} className={styles.item} prefetch={false}>
            <div className={styles.text_wrapper}>
            <div className="img_box">
                {avatar ? <IcloudImage src={avatar} width={270} height={270} alt="brand logo" /> : null }
            </div>
            {children}
                <div className='flags_wrap'>
                    {bottomView.map((item , index) => (
                        <div key={index} className='flag'>
                            <FlagsComponents locale={item} alt={`flag`}  className='country-box-select'/>
                        </div>
                    ))}
                </div>
            </div>
        </Link>
    )
}
