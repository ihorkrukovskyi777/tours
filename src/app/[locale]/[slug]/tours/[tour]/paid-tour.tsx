import {getLocale, getTranslations} from "next-intl/server";
import {FetchTour} from "@entities/paid-tour/api/fet-paid-tour";
import SwiperGalleryVertical from "@entities/paid-tour/ui/swiper-gallery-vertical";
import TitleAndDescription from "@entities/paid-tour/ui/title-and-description";
import InfoAboutTourBlock from "@entities/paid-tour/ui/info-about-tour-block";
import Languages from "@entities/paid-tour/ui/languages";
import BookingWidgetView from "@entities/paid-tour/views/bokun-widget.view";
import ImageDuration from "@/assets/images/svg/paid/duration.svg";
import IconHieroglyph from '@/assets/images/svg/paid/language.svg';
import useWidgetTranslate from "@i18n/useWidgetTranslate";
import DefaultSection from "@entities/paid-tour/ui/default-section";
import SwiperBlock from "@entities/paid-tour/ui/swiper-block";
import CardLanguage from "@entities/paid-tour/ui/card/card-language";
import I18nChangeOfLanguage from "@shared/ui/languages/change-of-language/i18n-change-of-language";
import {PATH_TOURS} from "@shared/constants/route";
import Footer from "@shared/ui/layouts/footer/footer";
import BaseTabs from "@entities/paid-tour/views/base-table";
import './styles/paid.scss'

interface Props {
    id: number
    slug: string
}

const PaidTour = async ({id, slug}: Props) => {
    const locale = await getLocale()
    const fetch = new FetchTour(locale)

    const [tour, info, similar, locales] = await Promise.all([
        fetch.getTourBanner(id),
        fetch.getBokunInfo(id),
        fetch.getSimilar(id),
        fetch.getLocalesTourPage(id)

    ])
    const languages = locales?.map(item => {
        return {title: item.tour.title, locale: item.tour.locale, slug: `${item.city.slug}/${PATH_TOURS}/${item.tour.slug}`};
    }) ?? []

    const i18n = await useWidgetTranslate(locale)
    const images = [tour.image, tour.photos].flat().filter(img => !!img?.src)
    // console.log(tour, info, similar)
    const t = await getTranslations();


    return (
        <div className="experience-page">
            <div className="container">

                <div className="layout_sidebar">
                    <div className="layout_sidebar__content">
                        <div className="padding_sm">
                            <SwiperGalleryVertical images={images}/>
                        </div>
                        <div className="padding_sm_bottom">
                            <TitleAndDescription
                                title={tour.title}
                                description={tour.excerpt}
                            />
                        </div>
                        <section className="information-tour border_top border_bottom padding_sm">
                            <div className="grid grid__row_3">
                                <InfoAboutTourBlock icon={ImageDuration} title={t('duration')}>
                                    <div>{(tour.duration).toFixed(2)} {t('hours', {count: tour.duration})}</div>
                                </InfoAboutTourBlock>
                                <InfoAboutTourBlock icon={IconHieroglyph} title={t('language')}>
                                    <Languages languages={tour.bokun?.locales}/>
                                </InfoAboutTourBlock>
                            </div>
                        </section>

                    </div>
                    <div className="layout_sidebar__sidebar">
                        <div className="padding_sm_top mobile_padding_reset">
                            {tour.bokun.id ? <BookingWidgetView i18n={i18n} bokun_id={tour.bokun.id}/> : null}
                        </div>
                    </div>
                </div>
                <div className="layout_sidebar">
                    <div className="layout_sidebar__content">
                        <div className="padding_sm">
                            <BaseTabs info={info}/>
                        </div>
                    </div>
                    <div className="layout_sidebar__sidebar"></div>
                </div>




            {!!similar.length &&
                <div className="padding_sm shadow overflow-hidden">
                    <DefaultSection title={t('similarExperiences')} label={slug}>
                        <SwiperBlock
                            spaceBetween={16}
                            slidesPerView={4}
                            loop={similar.length > 4 ? true : false}
                            mobileFixedWidth={similar.length < 3}
                            padding="0"
                            arrowPadding="6"
                            navigation={false}
                            autoHeightSlide={true}
                        >
                            {similar.map(item => {
                                return <CardLanguage experience={item} key={item.id}/>
                            })}
                        </SwiperBlock>
                    </DefaultSection>
                </div>
            }
            </div>
            <div className="padding_md">
                {/*@ts-ignore*/}
                <I18nChangeOfLanguage locale={locale} languages={languages}/>
            </div>

            <Footer locale={locale}/>
        </div>
    )
}

export default PaidTour