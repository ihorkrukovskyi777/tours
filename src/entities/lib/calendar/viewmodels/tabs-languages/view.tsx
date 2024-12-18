'use client';
import {Fragment} from "react";
import Loader from '@shared/ui/loaders/default-loader';
import FlagsComponents from "@shared/ui/flags";
import {observer} from "mobx-react-lite";
import {useLanguagesProps} from "@entities/lib/calendar/viewmodels/tabs-languages/use-props";
import {useCaseChangeLocale} from "@entities/lib/calendar/usecases";
import "@entities/calendar/ui/tabs-languages/style.css";

export const TabsLanguagesView = observer(() => {

    const {getters, actions, i18n, state} = useLanguagesProps();

    const COUNTRY_LOCALES = getters.countryLocales
    const useCase = useCaseChangeLocale()

    return (
        <ul className={`tabs ${getters.settingsTab} ${getters.mobileClass}`}>
            {getters.availableLocale?.map((item, index) => {
                return (
                    <Fragment key={index}>
                        {getters.isLoading ?
                            <li className="tab_item">
                                <Loader/>
                            </li>
                            :
                            <>
                                {index === 6 && !state.seeAllBtn &&
                                    <li className="see-all" onClick={actions.toggleSeeAll}>{i18n.see_all}</li>}
                                <li onClick={() => useCase(item.code)}
                                    className={getters.selectedCode === item.code ? "tab_item active" : "tab_item"}
                                    key={item.code}>
                                    <div className="icon_wrap">
                                        <FlagsComponents
                                            locale={item.code}
                                            alt={item.defaultLocale}
                                            width={30}
                                            height={30}
                                        />
                                    </div>
                                    <span>{COUNTRY_LOCALES[item.code]}</span>
                                    <div className="box_loader">
                                        <div className="loader_01"></div>
                                    </div>
                                </li>
                            </>

                        }
                    </Fragment>
                )
            })}

        </ul>
    );
})

export default TabsLanguagesView

