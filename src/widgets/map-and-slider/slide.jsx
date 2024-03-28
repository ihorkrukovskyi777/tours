import IcloudImage from "@/shared/ui/icloud-image";
import {memo} from "react";
import Image from "next/image";
import tourSVG from "/public/images/svg/tour.svg";
import Ticket from "@/widgets/map-and-slider/slider-tours/ticket";

export default memo(function Slide({tours, title, attachment, tickets = [], i18n, hideBottom}) {

    return <div className='item'>
        <div className='item_top'>
            <div className="img_wrap">
                <div className="item_name">{title}</div>
                <IcloudImage
                    size="625x350"
                    src={attachment.src}
                    alt={attachment?.alt}
                    width={625}
                    height={350}
                />
            </div>
            {hideBottom && Object.values(tours)?.length > 0 ?
                <div className="text_wrap">
                    <div className="list">
                        <div>
                            <Image src={tourSVG} width={20} height={20} alt="icon"/>
                        </div>
                        <div>{Object.values(tours)?.length > 1 ? i18n.tours : i18n.tour}: {Object.values(tours).join(', ')}</div>
                    </div>
                </div>
                : null}
        </div>

        {Object.keys(tickets).length > 0 ? <h3>{i18n.activities_nearby}:</h3> : null}
        {tickets?.map((ticket) => <Ticket key={ticket.id} {...ticket} i18n={i18n}/>)}

    </div>
})
