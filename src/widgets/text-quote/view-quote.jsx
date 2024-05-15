import "./style.css";

export default function ViewQuote({ description }) {

  return (
    <section className="text_quote">
      <div className="container">
        <div className="top_wrapper">
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: description ?? "" }}
          ></div>
        </div>
      </div>
    </section>
  );
}
