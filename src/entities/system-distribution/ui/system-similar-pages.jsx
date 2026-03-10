import useDefaultI18n from '@/i18n/hooks/useDefaultI18n';
import { getHrefLocale } from '@/i18n/get-href-locale';
import { getSystemSimilarPages } from '@/entities/system-distribution/api';
import Card from '@/shared/ui/card-components/card/card';
import '@/shared/ui/card-components/row-cities/style.css';

/**
 * @param {{ id: string, locale: string }} props — page id and locale; fetches similar pages from API.
 */
export default async function SystemSimilarPages({ id, locale }) {
    const similarPages = await getSystemSimilarPages(id, locale);
    const i18n = await useDefaultI18n(locale);
    if (!Array.isArray(similarPages) || similarPages.length === 0) {
        return null;
    }

    const title = i18n.t('similar_pages');

    return (
        <section className="most_popular_city">
            <div className="container">
                <div className="wrapper">
                    <h2 className="title">{title}</h2>
                    <div className="items">
                        {similarPages.map((item) => {
                            const href = item.slug ? getHrefLocale(locale, item.slug) : null;
                            if (!href || !item.title) return null;
                            const attachment = item.image
                                ? { src: item.image.src, alt: item.image.alt ?? item.title ?? '' }
                                : { src: '', alt: item.title ?? '' };
                            return (
                                <Card
                                    key={item.id}
                                    font="large"
                                    size="390x250"
                                    attachment={attachment}
                                    url={href}
                                    title={item.title}
                                    topElement={<div className="flags_wrap" />}
                                    bottomElement={<div className="reviews"><div className="rate_box 12"><div /></div></div>}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
