'use client'
import Script from "next/script";
export default function ClientInsertCode({ scripts, children, scriptInner }) {

    return (
        <div className="insert-a-code container">
            <Script dangerouslySetInnerHTML={{__html: scriptInner}}></Script>
            {scripts.map((src, index) =>  <Script async={true} defer={true} key={index} src={src}></Script>)}
            {children}
        </div>
    )
}