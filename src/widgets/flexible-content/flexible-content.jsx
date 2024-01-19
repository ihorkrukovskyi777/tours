import dynamic from "next/dynamic";
import ChangeOfLanguage from "@/widgets/change-of-language/change-of-language";
import BannerHome from "@/widgets/flexible-content/sections/flexible-content/banner-home/banner-home";

const AllCities = dynamic(
    () => import("@/widgets/flexible-content/sections/all-cities/all-cities"),
    {ssr: true}
)

const ContactUs = dynamic(
    () => import("@/widgets/flexible-content/sections/contact-us/contact-us"),
    {ssr: true}
)

const FLEXIBLE_CONTENT = {
    sitemap_section: AllCities,
    contact_us_section: ContactUs,
    banner: BannerHome,
}
export default async function FlexibleContent({flexibleContent = [], locale, title, id, languages, content}) {
    console.log(flexibleContent, 'flexibleContent')
    return (
        <>
            {content ? <div dangerouslySetInnerHTML={{__html:content}}></div> : null}
            {flexibleContent.map((flexible, index) => {
                const Component = FLEXIBLE_CONTENT[flexible];

                if(Component === undefined) {
                    return null
                }
                return <Component key={flexible} locale={locale} title={title} id={id} index={index}/>
            }) }
            <ChangeOfLanguage languages={languages} title={title}/>
        </>
    )
}
