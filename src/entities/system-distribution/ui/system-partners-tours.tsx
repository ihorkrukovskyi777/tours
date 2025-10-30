import {getPartnerTours} from "@/entities/system-distribution/api";
import {getContentFlexibleTitle} from "@/entities/system-distribution/helpers";
import SystemPartnersToursGrid from "./system-partners-tours-grid";
import '../styles/system-partners-tours.scss';

interface SystemPartnersToursProps {
    id: number;
    locale: string;
    flexible: any;
}

export default async function SystemPartnersTours({id, locale, flexible}: SystemPartnersToursProps) {
    const data = await getPartnerTours(id, locale);
    if (!data?.tours?.length) {
        return null
    }
    const {title} = getContentFlexibleTitle(flexible, locale);

    return (
        <section className="partners_tours_section">
            <div className="container">
                <h2 className="title">{title}</h2>
                <SystemPartnersToursGrid tours={data.tours} locale={locale} />
            </div>
        </section>
    );
}

