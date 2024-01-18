import { allGuides } from '@/entities/api';
import dynamic from "next/dynamic";

import './style.css';

const SwiperGuides = dynamic(
  () => import("@/entities/guide/ui/swiper/swiper"),
  { ssr: true}
)

export default async function Guides({title="Your Guides in Bogota" , id }) {
  const items = await allGuides(id);
  
  if(!items?.length) {
    return null
  }

  return (
    <section className="guides_section">
        <div className="container">
            <h2>{title}</h2>
           <SwiperGuides guides={items} />
        </div>

    </section>

  )
}
