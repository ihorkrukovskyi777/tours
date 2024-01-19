import dynamic from "next/dynamic";
import ChangeOfLanguage from "@/shared/ui/languages/change-of-language/change-of-language";
import BannerHome from "@/shared/ui/flexible-content/sections/banner-home/banner-home";

const AllCities = dynamic(
    () => import("@/shared/ui/flexible-content/sections/all-cities/all-cities"),
    {ssr: true}
)

const ContactUs = dynamic(
    () => import("@/shared/ui/flexible-content/sections/contact-us/contact-us"),
    {ssr: true}
)
const MostPopular = dynamic(
    () => import("@/shared/ui/flexible-content/sections/most-popular/most-popular"),
    {ssr: true}
)

const FLEXIBLE_CONTENT = {
    sitemap_section: AllCities,
    contact_us_section: ContactUs,
    banner: BannerHome,
    most_popular: MostPopular,
}
export default async function FlexibleContent({flexibleContent = [], locale, title, id, languages, content = ''}) {
    console.log(flexibleContent, 'flexibleContent', content)
    return (
        <>
            {!!content && typeof content === 'string' ? <div dangerouslySetInnerHTML={{__html: content || ''}}></div> : null}
            {flexibleContent.map((flexible, index) => {
                const Component = FLEXIBLE_CONTENT[flexible];

                if(Component === undefined) {
                    return null
                }
                return <Component key={flexible} locale={locale} title={title} id={id} index={index} flexibleKey={flexible}/>
            }) }
            <ChangeOfLanguage languages={languages} title={title}/>
        </>
    )
}
