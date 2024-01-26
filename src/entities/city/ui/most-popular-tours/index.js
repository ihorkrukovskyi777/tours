import { picketToursBox } from "@/entities/api";
import RowTours from "@/shared/ui/card-components/row-tours/row-tours";

export default async function MostPopularTours({
  id,
  locale,
  slug,
  title = ''
}) {
  let data = await picketToursBox(id, locale);
  if (!data.tours?.length) {
    return null;
  }

  const tours = data.tours.map((item) => ({ ...item, citySlug: slug }));
  return <RowTours tours={tours} title={data.title}></RowTours>;
}
