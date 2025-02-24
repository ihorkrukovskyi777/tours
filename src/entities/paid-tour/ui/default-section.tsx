import {ReactNode} from "react";
import Image from "next/image";
import './styles/default-sections.scss';

interface Props {
    title: string,
    label?: string,
    children: ReactNode,
    gap?: string,
    row?: number
    buttonText?: string,
    icon?: string
    titleStyle?: "normal" | "gray",
    button?: ReactNode
    display?: string,
    displayContent?: string,

}

const DefaultSection = (props: Props) => {
    const {
        title = 'lorem',
        label,
        children,
        gap = 'sm',
        row = 1,
        icon,
        titleStyle = 'normal',
        button,
        display = '',
        displayContent = ''
    } = props
    return (
        <section className={`default_section ${display}`}>
            <div className="default_section__title_wrap">
                {label && <span className="default_section__label">{label}</span>}
                <h2 className={titleStyle}>{icon &&
                    <Image className="icon_title" src={icon} alt={'icon'}/>} {title}</h2>
            </div>
            <div className={`
                default_section__content default_section__content_${gap}
                default_section__content_row_${row} 
                ${displayContent} 
            `}>
                {children}
            </div>
            {button}
        </section>

    )
}

export default DefaultSection;