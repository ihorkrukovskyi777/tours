'use client';
import {Fragment, useLayoutEffect, memo} from "react";
import EnSvg from '@/assets/images/languages/en-svg';
import {useState} from 'react';
import './style.css';
import Loader from '../loaders/default-loader';

const tabsBack = [
    {
        title: "English",
        icon: '../../../assets/images/languages/en-svg',
        active: true,
        code: 'en',
    },
    {
        title: "Espanolo",
        icon: '../../../assets/images/languages/en-svg',
        active: false,
        code: 'es',
    },
    {
        title: "English",
        icon: '../../../assets/images/languages/en-svg',
        active: false,
        code: 'fr',
    },
    {
        title: "English",
        icon: '../../../assets/images/languages/en-svg',
        active: false,
        code: 'de',
    },
    {
        title: "English",
        icon: '../../../assets/images/languages/en-svg',
        active: false,
        code: 'it',
    },
    {
        title: "English",
        icon: '../../../assets/images/languages/en-svg',
        active: false,
        code: 'cat',
    },
]
const SettingsTab = tabsBack.length < 6 ? 'not_full' : '';

export default memo(function TabsLanguages({loading, onChange = code => {}, selectedCode = 'en'}) {

    return (
        <ul className={`tabs ${SettingsTab}`}>
            {tabsBack.map((item, index) => {
                return (
                    <Fragment key={index}>
                        {loading === true ?
                            <li className="tab_item">
                                <Loader/>
                            </li>
                            :
                            <li onClick={() => onChange(item.code)}
                                className={selectedCode === item.code ? "tab_item active" : "tab_item"} key={item.code}>
                                <div className="icon_wrap">
                                    <EnSvg/>
                                </div>
                                <span>{item.title}</span>
                                <div className="box_loader">
                                    <div className="loader_01"></div>
                                </div>
                            </li>
                        }
                    </Fragment>
                )
            })}

        </ul>
    );
})

