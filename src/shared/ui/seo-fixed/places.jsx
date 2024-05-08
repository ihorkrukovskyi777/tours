import IcloudImage from "@/shared/ui/icloud-image";
import Ticket from "@/widgets/map-and-slider/slider-tours/ticket";

export default function PlacesFixedSeo({title, attachment, tickets = [], i18n}) {
    return (
        <li className='item'>
            <h3 className="item_name">{title}</h3>
            <IcloudImage
                size="625x350"
                src={attachment.src}
                alt={attachment?.alt}
                width={625}
                height={350}
            />
            {tickets?.map((ticket) => <Ticket key={ticket.id} {...ticket} i18n={i18n}/>)}
        </li>
    )
}