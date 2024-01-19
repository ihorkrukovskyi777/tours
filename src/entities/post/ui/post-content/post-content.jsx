import './style.css';

export default async function PostContent({children}) {
    const textWithoutCaptions = children.replace(/\[caption[^\]]*](.*?)\[\/caption]/gi, '');
    return (
        <div className="post_content">
            <div className='container'>
                <div className='wrapper' dangerouslySetInnerHTML={{ __html: textWithoutCaptions }}></div>
            </div>
        
        </div>
    )
}
