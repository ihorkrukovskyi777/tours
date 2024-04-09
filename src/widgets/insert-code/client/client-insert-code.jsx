"use client";
import Script from "next/script";
import { memo } from "react";
export default memo(function ClientInsertCode({
  scripts,
  children,
  scriptInner,
}) {
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
