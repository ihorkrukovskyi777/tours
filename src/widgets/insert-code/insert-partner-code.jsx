import useParseCode from "@/shared/hooks/useParseCode";
import dynamic from "next/dynamic";
import { insertPartnerCode } from "@/entities/api";
import { fallbackLng } from "@/i18n/settings";

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

  if (typeof data.insertCode !== "string") {
    return null;
  }

  const { scripts, scriptInner, html } = useParseCode(data.insertCode);

  return (
    <>
      <ClientInsertCode scripts={scripts} scriptInner={scriptInner}>
        {html}
      </ClientInsertCode>
    </>
  );
}
