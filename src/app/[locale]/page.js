import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
const FlexibleContent = dynamic(() => import("@/widgets/flexible-content"), {
  ssr: true,
});
export default async function Home({ params: { locale }, ...props }) {
  const pageType = await fetch(
    `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/page/type/home?locale=${locale}`,
    { next: { revalidate: 60 } }
  );
  const data = await pageType.json();
  console.log(data);
  if (data.statusCode === 404 || typeof data.id !== "number") {
    notFound();
  }
  const { languages } = data;

  return (
    <>
      <FlexibleContent
        {...data}
        id={data.translateId}
        locale={locale}
        {...props}
        languages={languages.map((lang) => ({ ...lang, slug: "" }))}
      />
    </>
  );
}
