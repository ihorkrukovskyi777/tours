import IcloudImage from "@/shared/ui/icloud-image";
import Link from "next/link";
export default function Card({attachment = '', url , title, children, size = 'public', topElement, bottomElement}) {
    return (
        <div className='item_wrap'>
            <div className="item">
                <IcloudImage
                    className="img"
                    width={518}
                    height={250}
                    src={attachment.src}
                    alt={attachment.alt || ''}
                    size={size}
                />
                <div className="intro">
                    <Link href={url} prefetch={false}>{title}</Link>
                </div>
                {topElement}
                {bottomElement}
            </div>
            {children}
        </div>
    )
}
