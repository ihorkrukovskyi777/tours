import {ReactNode} from "react";
import Image from "next/image";
import './styles/info-about-tour.scss';

interface Props {
    icon: string,
    title: string,
    children: ReactNode,
}

const InfoAboutTourBlock = ({icon , title = 'Duration' , children} : Props) => {
    return (
        <div className="info_about_tour">
            <div className="info_about_tour__info">
                <Image className="icon" src={icon as string} alt='alt' />
                <div>
                    <h3>{title}</h3>
                    <div className="content">{children}</div>
                </div>
            </div>
        </div>
    )
}

export default InfoAboutTourBlock;