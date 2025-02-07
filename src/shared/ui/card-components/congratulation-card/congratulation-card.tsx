'use client'
import Link from "next/link";
import {MouseEvent} from "react";
import './style.css';

interface Props {
    title: string,
    url: string,
    attachment?: { src: string, alt: string },
    sale?: string,
    size?:string
    onLink?(link: string): void
}


const CongratulationCard = ({title, attachment, url, sale, size = 'public', onLink}: Props) => {

    const onLinkClick = (e: MouseEvent<HTMLElement>) => {
        if(onLink) {
            e.preventDefault()
            onLink(url)
        }
    }
    return (
        <div className="congratulation-card">
            <Link href={url} onClick={onLinkClick}>
                {attachment &&
                    <img
                        loading="lazy"
                        className="img"
                        key={attachment.src}
                        width={518}
                        height={250}
                        src={`${process.env.NEXT_PUBLIC_CLOUD_IMAGE}/${attachment.src}/${size}`}
                        alt={attachment.alt ?? 'trip'}
                    />
                }
                <div className="box">
                    <h2>{title}</h2>
                </div>
                <div className="bottom_info">
                    {sale && <div className="sale">{sale}</div>}
                </div>
            </Link>
        </div>
    )
}

export default CongratulationCard;

