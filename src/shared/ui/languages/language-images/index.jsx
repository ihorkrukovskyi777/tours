import FlagsComponents from "@/shared/ui/flags";
import styles from './style.module.css'
export default function LanguageImages({ locales }) {

    return (
        <div className="flags_wrap">
            {locales?.map(({code, id}) => {
                return (
                    <div key={id} className={styles.flag}>
                        <FlagsComponents locale={code} alt={code}/>
                    </div>
                )
            })}
        </div>

  )
}
