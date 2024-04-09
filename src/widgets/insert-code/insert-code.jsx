import { insertCode } from "@/entities/api";
import dynamic from "next/dynamic";
import { fallbackLng } from "@/i18n/settings";
import useParseCode from "@/shared/hooks/useParseCode";

const ClientInsertCode = dynamic(
  () => import("@/widgets/insert-code/client/client-insert-code"),
  {
    ssr: false,
  }
);
export default async function InsertCode({
  id,
  type = "city",
  locale = fallbackLng,
}) {
  const code = await insertCode(id, type, locale);
  const { scripts, scriptInner, html } = useParseCode(code);
  if (typeof code !== "string") {
    return null;
  }


  return (
    <ClientInsertCode scripts={scripts} scriptInner={scriptInner}>
      {html}
    </ClientInsertCode>
  );
}
