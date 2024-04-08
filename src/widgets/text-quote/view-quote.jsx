import "./style.css";

export default function ViewQuote({ title, description }) {
  return (
    <section className="text_quote">
      <div className="container">
        <div className="top_wrapper">
          {title && <h2>{title}</h2>}
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: description ?? "" }}
          ></div>
        </div>
      </div>
    </section>
  );
}
