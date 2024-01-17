import dynamic from "next/dynamic";
import ChangeOfLanguage from "@/widgets/change-of-language/change-of-language";

const AllCities = dynamic(
    () => import("@/widgets/flexible-content/sections/all-cities/all-cities"),
    {ssr: true}
)

const FLEXIBLE_CONTENT = {
    sitemap_section: AllCities
}
export default async function CityPage({flexibleContent = [], locale, title, id, languages}) {
    return (
        <>
            {flexibleContent.map(flexible => {
                const Component = FLEXIBLE_CONTENT[flexible];

                if(Component === undefined) {
                    return null
                }
                return <Component key={flexible} locale={locale} title={title} id={id}/>
            }) }
            <ChangeOfLanguage languages={languages} title={title}/>
        </>
    )
}
