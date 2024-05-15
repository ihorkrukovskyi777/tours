import "./style.css";

export default function ViewQuote({ description , no_margin = false }) {
  const margin = no_margin ? "no_margin" : "default";

  return (
    <section className={`text_quote ${margin}`}>
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
