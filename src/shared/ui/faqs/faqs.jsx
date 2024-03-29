import Dropdown from "@/shared/ui/selectors/dropdown/dropdown";
import FaqSchema from "@/shared/schema/faq";
import "./style.css";

export default function Faqs({i18n, questions = [], style = {}}) {
    return (
        <>
            {questions?.length ? <FaqSchema questions={questions}/> : null}
            <section className="faq">
                <div className="container" style={style}>
                    {questions?.length ? <h2>{i18n.faq}</h2> : null}
                    <div className="wrapper">
                        {questions?.map((item, index) => (
                            <Dropdown key={index} title={item.title} id={"panelid_" + index}>
                                {item.text}
                            </Dropdown>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
