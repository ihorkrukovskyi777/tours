import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import SearchIcon from "@/assets/images/svg/search-icon.svg";
import Image from "next/image";
import {useEffect, useRef} from "react";
import {InputPhoneModel} from "@/models/input/input-phone.model";
import {useDetectClickOutside} from "react-detect-click-outside";

import './style.css';
import {PAID_TOUR_IN_CITY} from "@i18n/path-rewrites/paid-tour-in-city.mjs";


interface Props {
    model: InputPhoneModel
}

export default observer(function SwitcherIcons({ model }: Props) {
    const countries = model.countries;

    const activeCountry = { ...model.select_phone };
    const selected_country_data = model.selected_country;
    const selected_country = selected_country_data.map(item => toJS(item));
    const allCountriesJS = toJS(model.phone);
    const allCountries = allCountriesJS.filter(item => item.image !== null).sort((a, b) => a.name.localeCompare(b.name));
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, [model.dropdownOpen]);

    const ref = useDetectClickOutside({ onTriggered: model.closeDropdown });



    return (
        <div ref={ref}>
            <div className="switcher_icons"
                 onClick={(e) => {
                     e.stopPropagation();
                     model.toggleDropdown();
                 }}
            >
                <div className={`flag iti__${activeCountry.code?.toLowerCase()}`} data-slug={activeCountry.code?.toLowerCase()}></div>
                <p className="iti__selected-dial-code">+{activeCountry.phone_code}</p>
                <span className={`arrow ${model.dropdownOpen ? 'active' : ''}`}></span>
            </div>

            {model.dropdownOpen &&
                <div className="switcher_dropdown">
                    <div className="dropdown_search">
                        <Image className="search_icon" src={SearchIcon} alt='facebook'/>
                        <input
                            ref={inputRef}
                            type="text"
                            id="search_country"
                            onChange={(e) => model.search_filter(e.target.value)}
                            value={model.search} />
                    </div>
                    <div className="selected_countries">
                        {selected_country.map((item) => (
                            <div className="item_row" key={item.id} onClick={() => model.change_country(item.code)}>
                                <div className={`flag iti__${item.code?.toLowerCase()}`}></div>
                                <span>{item.name}</span>
                                <span>+{item.phone_code}</span>
                            </div>
                        ))}
                    </div>
                    <div className="all_countries">
                        {allCountries.length > 0 ?
                            allCountries.map((item) => (
                                <div className="item_row" key={item.id} onClick={() => model.change_country(item.code)}>
                                    <div className={`flag iti__${item.code?.toLowerCase()}`}></div>
                                    <span>{item.name}</span>
                                    <span>+{item.phone_code}</span>
                                </div>
                            ))
                            : <h2>Not Found {t('tour_in_language')}</h2>
                        }
                    </div>
                </div>
            }
        </div>
    );
})
