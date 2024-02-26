'use client'
import IcloudImage from '@/shared/ui/icloud-image';
import './style.css';

export default function Post({data}) {
    const { title , slug , excerpt , attachment } = data;
    const textWithoutCaptions = excerpt.replace(/\[(\S+)[^\]]*][^\[]*\[\/\1\]/g, '');
    const truncatedText = textWithoutCaptions;


    function text(paragraph, countWords) {
        let words = paragraph.split(' ');
        let f = words.slice(0, countWords);
        return f.join(' ')
    }

    let paragraph = truncatedText;
    let result = text(paragraph, 70) + '...';

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
            <div className="single-post-text" dangerouslySetInnerHTML={{ __html: result ?? ''}}></div>
        </div>
    )
}
