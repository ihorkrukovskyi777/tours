import Script from "next/script";
export default function ClientInsertCode({ scripts, children, scriptInner }) {

    return (
        <div className="insert-a-code container">
            <Script dangerouslySetInnerHTML={{__html: scriptInner}} id="inser-code-script"></Script>
            {scripts.map((src, index) =>  <Script id={src} async={true} defer={true} key={index} src={src}></Script>)}
            {children}
        </div>
    )
}