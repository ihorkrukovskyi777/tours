import IcloudImage from "@/shared/ui/icloud-image";
import {memo} from "react";
import Image from "next/image";
import tourSVG from "/public/images/svg/tour.svg";
import Ticket from "@/widgets/map-and-slider/slider-tours/ticket";

export default memo(function Slide({tours, id, title, attachment, alt = '', tickets = []}) {
    return <div className='item' data-place-id={`${id}`}>
        <div className='item_top'>
            <div className="img_wrap">
                <div className="item_name">{title}</div>
                <IcloudImage
                    src={attachment.src}
                    alt={alt}
                    width={400}
                    height={300}
                />
            </div>
            <div className="text_wrap">
                {Object.values(tours).map((val) => (
                    <div className="list" key={val}>
                        <div>
                            <Image src={tourSVG} width={20} height={20} alt="icon"/>
                        </div>
                        <div>{val}</div>
                    </div>
                ))}
            </div>
        </div>

        {tickets?.map((ticket) => <Ticket key={ticket.id} {...ticket}/>)}

    </div>
})
