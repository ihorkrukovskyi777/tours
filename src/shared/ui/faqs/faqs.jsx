"use client";
import Dropdown from "@/shared/ui/selectors/dropdown/dropdown";
import "./style.css";
export default function Faqs({ questions = [], style = {} }) {
  return (
    <section className="faq">
      <div className="container" style={style}>
        <h2>Faq</h2>
        <div className="wrapper">
          {questions?.map((item, index) => (
            <Dropdown key={index} title={item.title} id={"panelid_" + index}>
              {item.text}
            </Dropdown>
          ))}
        </div>
      </div>
    </section>
  );
}
