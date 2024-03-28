import Image from "next/image";
import heartSVG from '/public/images/svg/heart.svg';
import clockSVG from '/public/images/svg/clock.svg';
import ticketSVG from '/public/images/svg/tour.svg';
import {pad2, toHoursAndMinutes} from "@/shared/helpers/date";


export default function Ticket({duration, title, price, url, i18n}) {
    const {hours, minutes} = toHoursAndMinutes(duration);
    return (
        <div className="item-label">
            <p>
                <Image src={heartSVG} width={20} height={20} alt="icon"/>
                <span>{title}</span>
            </p>
            {hours > 0 || minutes> 0 ? <p>
                    <Image src={clockSVG} width={20} height={20} alt="icon"/>
                    <span>{i18n.duration}: {hours}:{pad2(minutes)} {i18n.hours}</span>
                </p>
                : null}
            <p>
                <Image src={ticketSVG} width={20} height={20} alt="icon"/>
                <span>{i18n.tickets}: {i18n.from} {price} USD</span>
            </p>
            <a className="button_basic" href={url+'?aid=3715&cmp=Features'}>{i18n.book_now}</a>
        </div>
    )
}
