'use client';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {useTranslations} from "next-intl";
import TitleWithContent from "@entities/paid-tour/ui/title-with-content";
import TourItinerary from "@entities/paid-tour/ui/map/tour-tinerary";
import {BokunItineraryModel} from "@entities/paid-tour/models/bokun-itinerary.model";
import {useLocale} from "use-intl";
import {observer} from "mobx-react-lite";
import {useClientModel} from "@shared/hooks/use-client-model";
import TourPickup from "@entities/paid-tour/ui/map/tour-pickup";
import CancellationPolicy from "@/bokun-widget/src/views/cancellation-policy";
import {BokunTourInfo} from "@entities/paid-tour/@types";
import 'react-tabs/style/react-tabs.css';
import './styles/base-table.scss';

interface Props {

    info: BokunTourInfo

}

const BaseTabs = observer(({info}: Props) => {
    const t = useTranslations()

    const locale = useLocale()
    const model = useClientModel<BokunItineraryModel>(() => new BokunItineraryModel(info.page_id, locale))
    return (
        <div className="base_tabs">
            <Tabs>
                <TabList>
                    <Tab>{t('description')}</Tab>
                    {model.showTableItinerary ? <Tab>{t('itinerary')}</Tab> : null}
                    {model.showTablePickup ? <Tab>{t('pickUp')}</Tab> : null}
                    {model.showTableMeetingPoint ? <Tab>{t('meetingPoints')}</Tab> : null}
                </TabList>

                <TabPanel>
                    <ul className={"ui_list_dots"} dangerouslySetInnerHTML={{__html: info.description}}></ul>
                    <div className="grid grid__row_2 grid__gap_md">

                        <TitleWithContent title={t('whatIsIncluded')} isShow={!!info.included}>
                            <ul dangerouslySetInnerHTML={{__html: info.included}}/>
                        </TitleWithContent>

                        <TitleWithContent title={t('exclusions')} isShow={!!info.excluded}>
                            <ul dangerouslySetInnerHTML={{__html: info.excluded}}/>

                        </TitleWithContent>

                        <TitleWithContent title={t('pleaseNote')} isShow={!!info.attention}>
                            <ul dangerouslySetInnerHTML={{__html: info.attention}}/>
                        </TitleWithContent>
                        <TitleWithContent title={t('whatDoINeedToBring')} isShow={!!info.requirements}>
                            <ul dangerouslySetInnerHTML={{__html: info.requirements}}/>

                        </TitleWithContent>
                        <TitleWithContent
                            title={t('cancellationPolicy')}
                            isShow={!!model.cancellationPolicy.length}
                        >

                            {Array.isArray(model?.cancellationPolicy) && model?.cancellationPolicy?.map((item) => {
                                if (['SIMPLE', 'FULL_REFUND', 'NON_REFUNDABLE'].includes(item.cancellationPolicy.policyType)) {
                                    const policy = item.cancellationPolicy;
                                    return (
                                        <div key={item.rate_id}>
                                            <h3 style={{marginTop: '24px'}}>{item.title}</h3>
                                            <ul style={{marginTop: '0px'}}>
                                                <li key={policy.id}>
                                                    <CancellationPolicy
                                                        cutoffHours={policy.simpleCutoffHours ?? 0}
                                                        percentage={0}
                                                        type={item.cancellationPolicy.policyType}
                                                    />
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                }

                                return (
                                    <div key={item.rate_id}>
                                        <h3 style={{marginTop: '24px'}}>{item.title}</h3>
                                        <ul style={{marginTop: '0px'}}>
                                            {item.cancellationPolicy.penaltyRules.map(penalty => {
                                                return (
                                                    <li key={penalty.id}>
                                                        <CancellationPolicy
                                                            cutoffHours={penalty.cutoffHours}
                                                            percentage={penalty.percentage}
                                                            type={item.cancellationPolicy.policyType}
                                                        />
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                )
                            })}

                        </TitleWithContent>
                    </div>

                </TabPanel>

                {model.showTableItinerary ?
                    <TabPanel>
                        <TourItinerary itinerary={model.itinerary}/>
                    </TabPanel> : null}
                {model.showTablePickup &&
                    <TabPanel>
                        <TourPickup type="pickup" pickup={model.pickup}/>
                    </TabPanel>
                }
                {model.showTableMeetingPoint &&
                    <TabPanel>
                        <TourPickup type="meeting" pickup={model.pickup}/>
                    </TabPanel>
                }

            </Tabs>
        </div>
    )
})

export default BaseTabs