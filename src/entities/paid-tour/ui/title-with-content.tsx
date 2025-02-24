import {ReactNode} from "react";

import './styles/title-with-content.scss';

interface Props {
    title: string,
    children?: ReactNode,
    isShow?: boolean
}

const TitleWithContent = ({title , children, isShow = true} : Props ) => {

    if(!isShow) {
        return null;
    }
    return (
        <div className="title_with_content">
            <h2>{title}</h2>
            <div className="title_with_content__content">
                {children}
            </div>
        </div>
    )
}

export default TitleWithContent;