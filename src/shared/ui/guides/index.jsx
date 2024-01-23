import { allGuides } from '@/entities/api';
import SwiperGuides from "@/shared/ui/guides/swiper/swiper";
import './style.css';

export default async function Guides({title, id, type}) {
  const items = await allGuides(id, type);

  if(!items?.length) {
    return null
  }
  return (
      <section className="guides_section" >
        <div className="container">
          <h2>Your Guides in Bogota {title}</h2>
          <SwiperGuides guides={items} title={title}/>
        </div>
      </section>
)
}
