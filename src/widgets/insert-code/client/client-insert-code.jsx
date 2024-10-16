"use client";
import {memo} from "react";
import Script from "next/script";

export default memo(function ClientInsertCode(props) {
    const {
        scripts,
        children,
        scriptInner,
        id
    } = props
    const isErrorCityWidget = async () => {
        setTimeout(async () => {
            const d1 = document.querySelector('#insert_code_block guruwalk-tour-cards');
            const shadow = d1.shadowRoot.querySelector('div')?.querySelector('#error')
            if (shadow) {
                const data = await fetch(
                    `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/city-notification/error-widget`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({page_id: id})
                    }
                );
            }
        }, 2000)
    }
    return (
        <div id="insert_code_block" className="insert-a-code container">
            <Script
                dangerouslySetInnerHTML={{__html: scriptInner}}
                id={`${Math.random()}`}
            ></Script>
            {scripts.map((src, index) => (
                <Script
                    id={src}
                    async={true}
                    defer={true}
                    onLoad={isErrorCityWidget}
                    key={index}
                    src={src}
                ></Script>
            ))}
            {children}
        </div>
    );
});
