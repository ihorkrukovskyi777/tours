import './style.css';
export default function Banner({headMobile= null, attachment = null, title, children, bottomView = null, size , nameBanner='', isMobile = false}) {
    const [width, height] = isMobile ? [430, 430] : [1900, 1200]

    const image = `${process.env.NEXT_PUBLIC_CLOUD_IMAGE}/${attachment?.src}/${isMobile ? '500x500' : 'public'}`;
    return (
        <section className={`banner ${nameBanner} ${headMobile ? 'head_mobile' : ''}`} style={{zIndex: 998, position: 'relative'}}>
            {headMobile ?
                <div className="banner_head_mobile">{headMobile}</div>
            : null}
            <div className={size}>
                 <img
                    className="banner_bg"
                    width={width}
                    height={height}
                    src={image}
                    alt={attachment?.alt}
                />
                <div className="container">
                    <div className="intro">
                        <h1 className="title" dangerouslySetInnerHTML={{__html: title || ''}}></h1>
                        <div className="wrapper">
                            {children}
                        </div>
                        {bottomView}
                    </div>
                </div>
            </div>
        </section>
    )
}
