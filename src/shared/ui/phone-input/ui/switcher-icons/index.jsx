import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import './style.css';



export default observer(function SwitcherIcons({ model }) {
    const countries = model.countries;

    const activeCountry = { ...model.select_phone };
    const selected_country_data = model.selected_country;
    const selected_country = selected_country_data.map(item => toJS(item));
    const allCountries = toJS(model.phone);
    console.log(activeCountry)

    return (
        <>
            <div className="switcher_icons">
                <div className={`flag iti__${activeCountry.code?.toLowerCase()}`}></div>
                <span>+{activeCountry.phone_code}</span>
            </div>


            <div className="switcher_dropdown">

                <div className="dropdown_search">
                    <input
                        type="text"
                        placeholder="search country"
                        onChange={(e) => model.search_filter(e.target.value)}
                        value={model.search} />
                </div>

                <div className="selected_contries">
                    {selected_country.map((item) => (
                        <div className="item_row" key={item.id} onClick={() => model.change_country(item.code)}>
                            <div className={`flag iti__${item.code?.toLowerCase()}`}></div>
                            <span>{item.name}</span>
                            <span>+{item.phone_code}</span>
                        </div>
                    ))}
                </div>

                {allCountries.map((item) => (
                    <div className="item_row" key={item.id} onClick={() => model.change_country(item.code)}>
                        <div className={`flag iti__${item.code?.toLowerCase()}`}></div>
                        <span>{item.name}</span>
                        <span>+{item.phone_code}</span>
                    </div>
                ))}
            </div>
        </>
    );
})
