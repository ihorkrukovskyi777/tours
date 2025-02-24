import {ReactNode} from "react";
import './style.css';

interface Props {
    children: ReactNode,
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
    size?: 'small' | 'medium' | 'large';
    position?: 'center' | 'left' | 'right';
}

const Title = ({children , tag = 'h2' , size , position} : Props) => {
    const Tag = tag;
    return(
        <Tag
            className={`title_custom ${size}`}
            style={{textAlign: position}}
        >
            {children}
        </Tag>
    )
}

export default Title;