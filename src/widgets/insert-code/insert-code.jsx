import {insertCode} from "@/entities/api";
import dynamic from "next/dynamic";
import parse from 'html-react-parser';
import {fallbackLng} from "@/i18n/settings";

const ClientInsertCode = dynamic(
    () => import("@/widgets/insert-code/client/client-insert-code"),
    {
        ssr: false,
    }
)
export default async function InsertCode({id, type = 'city', locale = fallbackLng}) {
    const code = await insertCode(id, type, locale);

    if (typeof code !== 'string') {
        return null;
    }

    const scripts = [];
    let scriptInner = '';
    const html = parse(code, {
        replace: (domNode) => {

            if (domNode.name === 'script') {

                scripts.push(domNode.attribs.src)
                domNode.children.forEach((item) => {
                    scriptInner = scriptInner + ' ' + item.data;
                })

                return '';
            }
        }
    })
    return <ClientInsertCode scripts={scripts.filter(Boolean)} scriptInner={scriptInner}>{html}</ClientInsertCode>
}