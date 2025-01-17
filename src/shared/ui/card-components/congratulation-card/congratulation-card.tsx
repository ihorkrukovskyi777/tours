import Link from "next/link";
import './style.css';

interface Props {
    title: string,
    url: string,
    attachment?: string,
    sale?: string,
}


const CongratulationCard = ({title, attachment, url, sale}: Props) => {
    return (
        <div className="congratulation-card">
            <Link href={url}>
                {attachment &&
                    // eslint-disable-next-line @next/next/no-img-element
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

