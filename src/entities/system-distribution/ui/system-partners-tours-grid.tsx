'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

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

interface SystemPartnersToursGridProps {
    tours: PartnerTour[];
    locale: string;
}

export default function SystemPartnersToursGrid({ tours, locale }: SystemPartnersToursGridProps) {
    const t = useTranslations();
    const [showAll, setShowAll] = useState(false);
    
    const visibleTours = showAll ? tours : tours.slice(0, 9);
    const hasMore = tours.length > 9;

    return (
        <>
            <div className="partners_tours_grid">
                {visibleTours.map((tour: PartnerTour) => (
                    <PartnerTourCard key={tour.id} tour={tour} locale={locale} />
                ))}
            </div>
            
            {hasMore && !showAll && (
                <div className="partners_tours_show_more">
                    <button 
                        onClick={() => setShowAll(true)}
                        className="partners_tours_show_more_button"
                    >
                        {t('show_me_more')}
                    </button>
                </div>
            )}
        </>
    );
}

interface PartnerTourCardProps {
    tour: PartnerTour;
    locale: string;
}

function PartnerTourCard({ tour }: PartnerTourCardProps) {
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
                        src={`${img}`}
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
                    <div
                        className="partner_tour_card__description"
                        dangerouslySetInnerHTML={{ __html: tour.description }}
                        suppressHydrationWarning
                    />
                )}
            </div>

            <div className="partner_tour_card__footer">
                <span className="partner_tour_card__price">
                    {t('from')} {price}
                </span>
                <a
                    href={`${tour.url}?aid=3715&cmp=SystemTours`}
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

