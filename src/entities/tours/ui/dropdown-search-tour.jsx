"use client";
import React, { useState } from 'react';
import {observer} from "mobx-react-lite";
import {StoreSearchCity} from "@/shared/ui/flexible-content/banner-home/store/search-city";
export default observer(function DropdownSearch() {
    const [store] = useState(new StoreSearchCity())
    return (
        <form autoComplete="off">
            <label>
                <input
                    name="q"
                    id="q"
                    type="text"
                    placeholder="Where Are You Going?"
                    defaultValue={''}/>
            </label>
            <div id="result"></div>
        </form>
    )
})


