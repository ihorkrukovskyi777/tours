'use client';
import Languages from "@/shared/ui/languages-site";
import Button from "@/shared/ui/button/button";
import LanguageImageDefault from '@/assets/images/languages/USUKflag.jpg'
import { useState } from "react";
import './style.css'; 
import LanguagesSite from "@/shared/ui/languages-site";

const data = {
    languages: [
        {
            title: "English",
            img: LanguageImageDefault,
            url: '/',
        },
        {
            title: "France",
            img: LanguageImageDefault,
            url: '/',
        },
        {
            title: "Lorem",
            img: LanguageImageDefault,
            url: '/',
        },
        {
            title: "Lore4,",
            img: LanguageImageDefault,
            url: '/',
        },
        {
            title: "Lorem",
            img: LanguageImageDefault,
            url: '/',
        },
        {
            title: "Lore4,",
            img: LanguageImageDefault,
            url: '/',
        },
        {
            title: "Lore4,",
            img: LanguageImageDefault,
            url: '/',
        },
    ],
};
export default function ChangeOfLanguage() {
    const [test, setTest] = useState('');
    const handleClick = () =>  setTest('loaded');
    return (
        <section id="change-of-language" className={test}>
            <div className="container">
                <h2>Free Tours in Your Language</h2>
                <ul>
                    {data.languages.map((item , index) => {
                        return(
                            <LanguagesSite key={index} url={item.url} img={LanguageImageDefault} >{item.title}</LanguagesSite>
                        )
                    })}
                </ul>
                {data.languages.length > 6 ? 
                    <div className="block-center"> 
                        <Button onClick={handleClick}>Load More</Button>
                    </div>
                    : 
                    null 
                }
            </div>
        </section>
  )
}
