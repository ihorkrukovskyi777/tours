import {fetchTravelResources} from "@/entities/api";
import reactStringReplace from 'react-string-replace';
import IcloudImage from "@/shared/ui/icloud-image";
import Link from "next/link";
import {getHrefLocale} from "@/i18n/get-href-locale";
import './style.css'
export default async function TravelResources({ id, locale }) {
    const results = await fetchTravelResources(id, locale)
    if(results?.isShowSection === false || results?.data?.length < 1) {
        return null
    }
    return (
        <div className="container">
            <div className="travel_resources">
                <h2 className="title">{results.title}</h2>
                <div className="travel_resources__content">
                    {results.data?.map((item, index) => {

                        const matchText = item.content.match(/<link>(.*?)<\/link>/g) ?? [];
                        let content = item.content ?? '';

                        for (const text of matchText) {
                            content =  reactStringReplace(item.content, text, (match, i) => {
                                return  <Link href={getHrefLocale(item.post.locale, item.post.slug) }>{match.replace('<link>', '').replace('</link>', '')}</Link>
                            });
                        }
                        return (
                            <div key={index}>
                                <IcloudImage src={item.icon.src} width={54} height={54}></IcloudImage>
                                <div>
                                    <h4>{item.title}</h4>
                                    <div className="travel_resources__content_text">{content}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}