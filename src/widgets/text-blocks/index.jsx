import CardText from '@/shared/ui/card-text';
import {getTextsBlocks} from "@/entities/api";
import './style.css';

export default async function TextBlocks({id, locale}) {
    const texts = await getTextsBlocks(id, locale)

    if(!Array.isArray(texts))
        return null;
    return (
        <section className="text_blocks">
            <div className="container">
                <div className="wrapper">
                    {texts.map((item, index) => {
                        return (
                            <CardText key={index} title={item.title}>
                                <div dangerouslySetInnerHTML={{__html: item.text ?? ''}}></div>
                            </CardText>
                        )
                    })}
                </div>
            </div>

        </section>

    )
}
