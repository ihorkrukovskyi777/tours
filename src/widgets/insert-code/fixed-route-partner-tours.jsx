'use client'
import Script from "next/script";
export default function FixedRoutePartnerTours() {
    return (
        <Script id="fixed-huk"
           dangerouslySetInnerHTML={{__html: `
                document.addEventListener('click', (e) => {
                    const { target } = e;
                    
                    const tag = target.nodeName === 'A' ? target : target.closest('a')
                    if(tag?.nodeName === 'A') {                                    
                        e.preventDefault();
                        const [url] = tag.href.split('?')
                        window.location.href = url;
                    }
                }, false)
           `}}
        />
    )
}