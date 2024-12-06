import Image from "next/image";

export default function IcloudImage( { src , size = 'public', alt = '', ...props}) {
    if(typeof src !== 'string' || !!src === false) {
        return null;
    }

    if(src.includes('http') || src.includes('https') ) {
        // eslint-disable-next-line @next/next/no-img-element
        return <img loading="lazy" src={src} alt={alt} />
    }
    return <Image  src={`${process.env.NEXT_PUBLIC_CLOUD_IMAGE}/${src}/${size}`} alt={alt ?? ''} {...props} ></Image>
}
