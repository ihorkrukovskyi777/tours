import { getTextQuote } from "@/entities/api";
import './style.css';
export default async function TextQuote({ id, locale, type = 'city'}) {

  const data = await getTextQuote(id, locale, type);
  return (
    <section className="text_quote">
        <div className="container">
            <div className="top_wrapper">
                {data.title ? <h2>{data.title}</h2> : null }
                <div className="description" dangerouslySetInnerHTML={{__html: data.description ?? ''}}>
                </div>
            </div>
        </div>

    </section>

  )
}
