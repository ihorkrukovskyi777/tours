import { getTextQuote } from "@/entities/api";
import './style.css';
export default async function TextQuote({ id, locale}) {

  const data = await getTextQuote(id, locale)
  return (
    <section className="text_quote">
        <div className="container">
            <div className="top_wrapper">
                <h2>{data.title ?? ''}</h2>
                <div className="description">
                    {data.description ?? ''}
                </div>
            </div>
        </div>

    </section>

  )
}
