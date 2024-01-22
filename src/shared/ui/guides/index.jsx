import { allGuides } from '@/entities/api';
import dynamic from "next/dynamic";

import './style.css';

const SwiperGuides = dynamic(
  () => import("@/shared/ui/guides/swiper/swiper"),
  { ssr: true }
)

export default async function Guides({title, id, type}) {
  const items = await allGuides(id, type);
  if(!items?.length) {
    return null
  }

  return (
    <section className="guides_section">
        <div className="container">
            <h2>Your Guides in Bogota {title}</h2>
            <SwiperGuides guides={items} />
        </div>
    </section>

  )
}
