import Image from "next/image";

export default function IcloudImage( { src , size = 'public', alt = '', ...props}) {
    if(src.includes('http') || src.includes('https')) {
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={src} alt={alt} />
    }
    return <Image {...props} src={`${process.env.NEXT_PUBLIC_CLOUD_IMAGE}/${src}/${size}`} alt={alt} {...props} ></Image>
}
