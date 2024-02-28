'use client';
import {Fragment, memo, useState} from "react";
import Loader from '../../../../shared/ui/loaders/default-loader';
import {useTranslation} from "@/i18n/client";
import {countryLocales} from "@/i18n/locales";
import FlagsComponents from "@/shared/ui/flags";
import './style.css';


export default memo(function TabsLanguages({loading, onChange = () => {}, selectedCode = 'en', activeLanguage = []}) {
    const settingsTab = activeLanguage?.length < 4 ?  'not_full' : '';
    const [seeAllBtn , setSeeAllBtn ] = useState(false);

    function toggleSeeAll() {
        setSeeAllBtn(true);
    }

    return (
        <ul className={`tabs ${settingsTab}`}>
            {activeLanguage?.map((item, index) => {
                return (
                    <Fragment key={index}>
                        {loading === true ?
                            <li className="tab_item">
                                <Loader/>
                            </li>
                            :
                            <>
                                {index === 6 && !seeAllBtn ? <li className="see-all" onClick={toggleSeeAll}>See All</li> : null}
                                <li onClick={() => onChange(item.code)}
                                    className={selectedCode === item.code ? "tab_item active" : "tab_item"} key={item.code}>
                                    <div className="icon_wrap">
                                        <FlagsComponents locale={item.code} alt={item.title} width={30} height={30} />
                                    </div>
                                    <span>{countryLocales[item.code]}</span>
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

