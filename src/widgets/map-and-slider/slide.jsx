import IcloudImage from "@/shared/ui/icloud-image";
import {memo} from "react";
import Image from "next/image";
import tourSVG from "/public/images/svg/tour.svg";
import Ticket from "@/widgets/map-and-slider/slider-tours/ticket";

export default memo(function Slide({tours, title, attachment, alt = '', tickets = [], i18n, hideBottom}) {
    console.log(tours, 'tours')
    return <div className='item'>
        <div className='item_top'>
            <div className="img_wrap">
                <div className="item_name">{title}</div>
                <IcloudImage
                    size="625x350"
                    src={attachment.src}
                    alt={alt}
                    width={625}
                    height={350}
                />
            </div>
            {hideBottom ?
                <div className="text_wrap">
                    <div className="list">
                        <div>
                            <Image src={tourSVG} width={20} height={20} alt="icon"/>
                        </div>
                        <div>{Object.values(tours).join(', ')}</div>
                    </div>
                </div>
                : null}
        </div>

        {tickets?.map((ticket) => <Ticket key={ticket.id} {...ticket} i18n={i18n}/>)}

    </div>
})
