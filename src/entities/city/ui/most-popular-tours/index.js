import { picketToursBox } from "@/entities/api";
import RowTours from "@/shared/ui/card-components/row-tours/row-tours";

export default async function MostPopularTours({
  id,
  locale,
  slug,
  title = "Most Popular Tours",
}) {
  let tours = await picketToursBox(id, locale);
  if (!tours?.length) {
    return null;
  }
  tours = tours.map((item) => ({ ...item, citySlug: slug }));
  return <RowTours tours={tours} title={title}></RowTours>;
}
