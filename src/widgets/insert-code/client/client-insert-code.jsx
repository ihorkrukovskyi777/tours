"use client";
import {memo, useEffect} from "react";
import Script from "next/script";
import {useState} from "react";
export default memo(function ClientInsertCode({
  scripts,
  children,
  scriptInner,
}) {


    const [load, setLoad] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoad(true);
        }, 2000)
    }, [])
    if(!load) {
        return null;
    }
  return (
    <div id="insert_code_block" className="insert-a-code container">
      <Script
        dangerouslySetInnerHTML={{ __html: scriptInner }}
        id={`${Math.random()}`}
      ></Script>
      {scripts.map((src, index) => (
        <Script
          id={src}
          async={true}
          defer={true}
          key={index}
          src={src}
        ></Script>
      ))}
      {children}
    </div>
  );
});
