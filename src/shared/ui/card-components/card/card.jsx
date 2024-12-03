import Link from "next/link";

export default function Card({font = '' ,attachment = '', url, title, children, size = 'public', topElement, bottomElement}) {
    return (
        <div className='item_wrap'>
            <div className="item">

                <img
                    className="img"
                    key={attachment.src}
                    width={518}
                    height={250}
                    src={`${process.env.NEXT_PUBLIC_CLOUD_IMAGE}/${attachment.src}/${size}`}
                    alt={attachment.alt ?? 'trip'}
                />

                <div className={`intro ${font}`}>
                    <Link href={url} prefetch={false}>{title}</Link>
                </div>
                {topElement}
                {bottomElement}
            </div>
            {children}
        </div>
    )
}
