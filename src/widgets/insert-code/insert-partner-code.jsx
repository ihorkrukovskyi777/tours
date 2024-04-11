import useParseCode from "@/shared/hooks/useParseCode";
import dynamic from "next/dynamic";
import {insertPartnerCode} from "@/entities/api";
import {fallbackLng} from "@/i18n/settings";
import ViewQuote from "@/widgets/text-quote/view-quote";
import FixedRoutePartnerTours from "@/widgets/insert-code/fixed-route-partner-tours";
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
                                                    isMobile = false
                                                }) {
    let data = await insertPartnerCode(id, type, locale);

    const {scripts, scriptInner, html} = useParseCode(data?.partner?.insertCode);

    if (!data?.partner?.enable) {
        return null;
    }

    return (
        <>
            {data?.title?.trim() && (
                <ViewQuote title={data.title} description={data.description}/>
            )}
            { isMobile || true ? <FixedRoutePartnerTours/> : null }
            <ClientInsertCode scripts={scripts} scriptInner={scriptInner}>
                {html}
            </ClientInsertCode>
        </>
    );
}
