'use client'
import ReactCountryFlag from "react-country-flag"
import {useLocale} from "use-intl";
import IconHieroglyph from '@/assets/images/svg/paid/language.svg';
import Image from "next/image";
import './styles/languages.scss';

const ICON: { [key in string]: string } = {
    en: 'gb',
    uk: 'ua',
    'pt-pt': 'pt',
    'ca': 'es-ct',
    'cat': 'es-ct',
    'zh': 'cn',
    'ja': 'jp',
    'hy': 'am',
    'ko': 'kr',
}

const getCountryCode = (lang: string): string => {
    return ICON[lang] || lang
}


interface Props {
    languages: string[],
    sorted?: boolean,
    hieroglyph?: boolean
}

const Languages = ({languages = [], sorted = false , hieroglyph = false}: Props) => {
    const locale = useLocale();
    const orderStyle = (lang: string) => {
        if (sorted) return {order: lang === locale ? '-1' : '1'}
        return {};
    }
    return (
        <div className="locales">
            {hieroglyph && <span className="hieroglyph_icon"><Image src={IconHieroglyph as string} alt={'logo'} /></span> }
            {languages.map((lang) => {
                return (
                    <span key={lang} style={orderStyle(lang)}>
                        <ReactCountryFlag  svg countryCode={getCountryCode(lang)}/>
                    </span>
                )
            })}
        </div>
    )
}

export default Languages;