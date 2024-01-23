import { allGuides } from '@/entities/api';
const LazyGuidesRow = dynamic(
    () => import("@/shared/ui/guides/lazy-guides-row"),
    { ssr: false }
)
import './style.css';
import dynamic from "next/dynamic";

export default async function Guides({title, id, type}) {
  const items = await allGuides(id, type);

  if(!items?.length) {
    return null
  }
  return (
      <LazyGuidesRow guides={items} title={title} />
  )
}
