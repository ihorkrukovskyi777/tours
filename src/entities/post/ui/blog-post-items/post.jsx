import IcloudImage from '@/shared/ui/icloud-image';
import './style.css';

export default function Post({data}) {
    const { title , slug , excerpt , attachment } = data;
    const textWithoutCaptions = excerpt.replace(/\[(\S+)[^\]]*][^\[]*\[\/\1\]/g, '');
    const truncatedText = textWithoutCaptions;

    return (
        <div className="single-post">
            <h3>
                <a href={slug}>{title}</a>
            </h3>
            <div className="single-post-img">
                <a href={slug}>
                    {attachment.src ? <IcloudImage src={attachment.src} width={800} height={550} alt={attachment.alt ? attachment.alt : 'img'} /> : null }
                </a>
            </div>
            <div className="single-post-text" dangerouslySetInnerHTML={{ __html: truncatedText ?? ''}}></div>
        </div>
    )
}
