'use client';
import {useState} from "react";
import Button from "@/shared/ui/button/button";
import LanguagesSite from "@/shared/ui/languages-site";
import './style.css';

export default function ChangeOfLanguage({languages, title}) {
    const [showLanguage, setShowLanguage] = useState(6);
    return (
        <section id="change-of-language">
            <div className="container">
                <h2>Free Tours in Your Language</h2>
                <ul>
                    {languages?.slice(0, showLanguage).map((item) => {
                        return (
                            <LanguagesSite
                                key={item.locale}
                                slug={item.slug}
                                code={item.locale}
                            >
                                Free Tours {title?.replace('<br>', '')} {item.name}
                            </LanguagesSite>
                        )
                    })}
                </ul>
                {showLanguage < languages?.length ?
                    <div className="block-center">
                        <Button onClick={() => setShowLanguage(value => value + 3)}>Load More</Button>
                    </div>
                    :
                    null
                }
            </div>
        </section>
    )
}
