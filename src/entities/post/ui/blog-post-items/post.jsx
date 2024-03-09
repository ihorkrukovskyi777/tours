import IcloudImage from '@/shared/ui/icloud-image';
import Link from "next/link";
import clip from "text-clipper";
import {next} from "@wordpress/shortcode";
import './style.css';

export default function Post({data}) {
    const { title , slug , excerpt , attachment } = data;

    let replaceShortCode = excerpt;
    let index = 0;
    while (true) {
        const shortCode = next('caption',replaceShortCode, index)
        if(!shortCode) {
            break
        }

        if(shortCode.shortcode.tag === 'caption') {
            replaceShortCode = replaceShortCode.replace(shortCode.content, ``);
        }
        index = shortCode.index+1
    }
    const content =  clip(replaceShortCode, 414, { html: true, stripTags : [ "img" ,  "svg" ] });
    return (
        <div className="single-post">
            <h3>
                <Link href={slug}>{title}</Link>
            </h3>
            <div className="single-post-img">
                <Link href={slug}>
                    {attachment.src ? <IcloudImage src={attachment.src} width={1920} height={500} alt={attachment.alt ? attachment.alt : 'img'} /> : null }
                </Link>
            </div>
            <div className="single-post-text" dangerouslySetInnerHTML={{ __html: content ?? ''}}></div>
        </div>
    )
}
