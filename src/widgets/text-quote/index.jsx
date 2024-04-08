import { getTextQuote } from "@/entities/api";
import ViewQuote from "./view-quote";

export default async function TextQuote({ id, locale, type = "city" }) {
  const data = await getTextQuote(id, locale, type);
  return <ViewQuote title={data.title} description={data.description} />;
}
