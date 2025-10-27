import {getPartnerTours} from "@/entities/system-distribution/api";
import {getContentFlexibleTitle} from "@/entities/system-distribution/helpers";
import {useTranslations} from "next-intl";
import '../styles/system-partners-tours.scss';
import useDefaultI18n from "@i18n/hooks/useDefaultI18n";

interface PartnerTour {
    id: number;
    title: string;
    description: string;
    url: string;
    rating: {
        rating: number;
        reviews: number;
    };
    price: {
        amount: number;
        currency: string;
    };
    image: {
        src: string;
        alt?: string;
    };
}

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
                <div className="partners_tours_grid">
                    {data.tours.map((tour: PartnerTour) => (
                        <PartnerTourCard  key={tour.id} tour={tour} locale={locale}/>
                    ))}
                </div>
            </div>
        </section>
    );
}

interface PartnerTourCardProps {
    tour: PartnerTour;
    locale: string;
}

function PartnerTourCard({tour}: PartnerTourCardProps) {
    const t = useTranslations();
    const img = tour.image?.src;
    const rating = (tour.rating?.rating || 0).toFixed(1);
    const reviews = tour.rating?.reviews || 0;
    const price = tour.price?.amount ? `${tour.price.currency} ${tour.price.amount}` : '';

    return (
        <div className="partner_tour_card">
            <div className="partner_tour_card__image">
                {img && (
                    <img
                        src={`${process.env.NEXT_PUBLIC_CLOUD_IMAGE}/${img}/390x250`}
                        alt={tour.image?.alt || tour.title}
                        loading="lazy"
                    />
                )}
            </div>

            <div className="partner_tour_card__content">
                <h3>{tour.title}</h3>
                <div className="partner_tour_card__rating">
                    {tour.rating?.rating > 0 && <span className="partner_tour_card__score">{rating}/10</span>}
                    {reviews > 0 &&
                        <span className="partner_tour_card__reviews">
                            {reviews} {t('reviews')}
                        </span>
                    }
                </div>
                {tour.description && (
                    <p
                        className="partner_tour_card__description"
                        dangerouslySetInnerHTML={{__html: tour.description}}
                        suppressHydrationWarning
                    />
                )}
            </div>

            <div className="partner_tour_card__footer">
                <span className="partner_tour_card__price">
                    {t('from')} {price}
                </span>
                <a
                    href={tour.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="partner_tour_card__button"
                >
                    {t('see_details')}
                </a>
            </div>
        </div>
    );
}

