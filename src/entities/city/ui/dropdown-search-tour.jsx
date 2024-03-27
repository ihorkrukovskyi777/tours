"use client";
import {useCallback , useState } from 'react';
import {observer} from "mobx-react-lite";
import {StoreSearchCity} from "@/entities/city/store/search-city";
import debounce from 'lodash.debounce';
import { getHrefLocale } from '@/i18n/get-href-locale';
import Link from 'next/link';

export default observer(function DropdownSearch({locale, i18n}) {
    const [store] = useState(new StoreSearchCity(locale));
    const debouncedChangeHandler = useCallback(
        debounce(() => {store.getFetchCities()}, 300)
        ,
        []);

    const fetchData = ({target}) => {
        let valueSearch = target.value.length > 0 ? target.value : null;
        store.setSearch(valueSearch);
        debouncedChangeHandler();
    }

    return (
        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
            <label>
                <input
                    name="q"
                    type="text"
                    placeholder={i18n.where_are_you_going}
                    value={store.value}
                    onChange={fetchData}
                />

            </label>
            <div className="result">
                <ul>
                    {store.cities.map((city) => <li key={city.id}><Link prefetch={false} href={getHrefLocale(locale , city.slug)} >{city.title}</Link></li>)}
                </ul>
            </div>
        </form>
    )
})
