import useParseCode from "@/shared/hooks/useParseCode";
import dynamic from "next/dynamic";
import { insertPartnerCode } from "@/entities/api";
import { fallbackLng } from "@/i18n/settings";
import ViewQuote from "@/widgets/text-quote/view-quote";
import "./style.css";

const ClientInsertCode = dynamic(
  () => import("@/widgets/insert-code/client/client-insert-code"),
  {
    ssr: false,
  }
);

export default async function InsertPartnerCode({
  id,
  locale = fallbackLng,
  type = "city",
}) {
  let data = await insertPartnerCode(id, type, locale);

  const { scripts, scriptInner, html } = useParseCode(data?.partner?.insertCode);

  if (typeof data?.partner?.insertCode !== "string") {
    return null;
  }

  return (
    <>
        {data?.title?.trim() && (
            <ViewQuote title={data.title} description={data.description} />
        )}
        <iframe src={`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/tour/endpoint`} frameBorder="0"></iframe>
      {/*<ClientInsertCode scripts={scripts} scriptInner={scriptInner}>*/}
      {/*  {html}*/}
      {/*</ClientInsertCode>*/}
    </>
  );
}
