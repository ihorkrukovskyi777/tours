import {getToursInCityForWidgetUseCase} from "@entities/api";
import useParseCode from "@/shared/hooks/useParseCode";
const ClientInsertCode = dynamic(
    () => import("@/widgets/insert-code/client/client-insert-code"),
    {
        ssr: false,
    }
);
import dynamic from "next/dynamic";
import Script from "next/script";
import CivitatisCard, {ICivitatisCard} from "@shared/ui/card-components/civitatis-card/civitatis-card";
import {getTranslations} from "next-intl/server";
import './insert-code/style.css'


interface Props {
    type: 'tour' | 'city'
    id: number
    locale: string
}

interface WidgetType {
    type: null | 'guruwalk' | 'civitatis';
    locale: string;
    slug: string;
    citySlugLocale?: string;
    title?: string
    tours: ICivitatisCard[];
}

function InsertCode({code, id}: { code: string, id: number }) {
    const {scripts, scriptInner, html} = useParseCode(code);
    return (
        // @ts-ignore
        <ClientInsertCode scripts={scripts} scriptInner={scriptInner} id={id}>
            {html}
        </ClientInsertCode>
    )
}

export default async function WidgetOtherTours({id, type, locale}: Props) {

    const t = await getTranslations();
    const [widget] = await Promise.all([
        getToursInCityForWidgetUseCase(id, type, locale)
    ]) as [WidgetType]


    if (widget?.type === 'guruwalk') { // @ts-ignore
        return (
            <div className="insert-a-code container" style={{display: 'block'}}>
                <Script
                    id="guruwalk_2"
                    async={true}
                    defer={true}
                    src={'https://assets.guruwalk.com/affiliates/widget.min.js'}
                ></Script>
                {/*// @ts-ignore*/}
                <guruwalk-tour-cards
                    affiliate="cqp26vnp1mgq8sywmd76"
                    city={widget.slug}
                    lang={widget.locale}
                    text-color="#484848"
                    primary-color="#ff0000"
                    secondary-color="#008489"
                    limit="3"
                    description="none">
                    {/*// @ts-ignore*/}
                </guruwalk-tour-cards>
            </div>
        )
    }
    if(widget?.type === 'civitatis') {
        const locale = widget.locale === 'pt-pt' ? 'pt' : widget.locale;
        return (
            <div className="container civitatis_widget_container">
                <div>
                    {widget.tours.map(tour => {
                        return <CivitatisCard card={tour} key={tour.id} />
                    })}

                </div>
                {!!widget.tours?.length && widget?.title &&
                    <div className="civitatis_widget_container__footer">
                        <a href={`https://www.civitatis.com/${locale}/${widget?.citySlugLocale ?? widget.slug}&cmp=strawberrytours`} target="_blank" rel="noreferrer">
                            {t('civitatis_widget_show_more', {city: widget?.title ?? ''})}
                        </a>
                    </div>
                }
            </div>
        )
    }

    return null
}