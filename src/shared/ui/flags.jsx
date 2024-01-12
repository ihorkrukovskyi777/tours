import Image from "next/image";
import de from '@/assets/images/languages/de.svg'
import en from '@/assets/images/languages/en.svg'
import pl from '@/assets/images/languages/pl.svg'
import fr from '@/assets/images/languages/fr.svg'
import es from '@/assets/images/languages/es.svg'
import pt from '@/assets/images/languages/pt.svg'
import it from '@/assets/images/languages/it.svg'
import cat from '@/assets/images/languages/cat.png'
import nl from '@/assets/images/languages/nl.svg'

const Flags = {
    en,
    de,
    pl,
    fr,
    es,
    it,
    cat,
    nl,
    ['pt-pt']: pt,
}
export default function FlagsComponents({ locale, alt, className = '',  ...props}) {
    if(!Flags[locale]) {
        return null;
    }
    return <Image {...props} src={Flags[locale]} alt={locale} className={className}/>
}
