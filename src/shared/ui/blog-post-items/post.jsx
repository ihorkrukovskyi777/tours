import IcloudImage from '../icloud-image';
import './style.css';

export default function Post({data}) {
    const { title , slug , excerpt , attachment } = data;
    const textWithoutCaptions = excerpt.replace(/\[caption[^\]]*](.*?)\[\/caption]/gi, '');
    const truncateText = (text, maxLength) => text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    const truncatedText = truncateText(textWithoutCaptions.trim(), 450);
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
            <div className="single-post-text" dangerouslySetInnerHTML={{ __html: truncatedText }}></div>
        </div>
    )
}
