'use client';
import EnSvg from '@/assets/images/languages/en-svg';
import { useState } from 'react';
import './style.css';

const tabsBack = [
    {   
        id: 1,
        title: "English",
        icon: '../../../assets/images/languages/en-svg',
        active: true
    },
    {
        id: 2,
        title: "English",
        icon: '../../../assets/images/languages/en-svg',
        active: false

    },
    {
        id: 3,
        title: "English",
        icon: '../../../assets/images/languages/en-svg',
        active: false
    },
    {
        id: 4,
        title: "English",
        icon: '../../../assets/images/languages/en-svg',
        active: false

    },
    {
        id: 5,
        title: "English",
        icon: '../../../assets/images/languages/en-svg',
        active: false
    },
    {
        id: 6,
        title: "English",
        icon: '../../../assets/images/languages/en-svg',
        active: false

    },
]
const SettingsTab = tabsBack.length < 6 ? 'not_full' : '';

export default function TabsLanguages() {
const [active, setActive] = useState(1);
return (
    <ul className={`tabs ${SettingsTab}`}>
        {tabsBack.map((item) => {
            return (
                <li onClick={() => setActive(item.id)} className={active === item.id ? "tab_item active" : "tab_item"} key={item.id} >
                    <div className="icon_wrap">
                        <EnSvg/>
                    </div>
                    <span>{item.title}</span>
                    <div className="box_loader">
                        <div className="loader_01"></div>
                    </div>
                </li>
            )
        })}
       
    </ul>
  );
}

