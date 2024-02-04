import Dropdown from "@/shared/ui/selectors/dropdown/dropdown";
import FaqSchema from "@/shared/schema/faq";
import "./style.css";

export default function Faqs({i18n, questions = [], style = {}}) {
    return (
        <>
            <FaqSchema questions={questions}/>
            <section className="faq">
                <div className="container" style={style}>
                    <h2>{i18n.faq}</h2>
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
