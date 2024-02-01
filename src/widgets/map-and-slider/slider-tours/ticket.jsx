import Image from "next/image";
import heartSVG from '/public/images/svg/heart.svg';
import clockSVG from '/public/images/svg/clock.svg';
import ticketSVG from '/public/images/svg/tour.svg';
import {useTranslation} from "@/i18n/client";
import {pad2, toHoursAndMinutes} from "@/shared/helpers/date";


export default function Ticket({duration, title, price, url}) {
    const {t} = useTranslation();
    const time = toHoursAndMinutes(duration / 60);

    const {hours, minutes} = toHoursAndMinutes(duration);
    return (
        <div className="item-label">
            <p>
                <Image src={heartSVG} width={20} height={20} alt="icon"/>
                <span>{title}</span>
            </p>
            {hours > 0 || minutes> 0 ? <p>
                    <Image src={clockSVG} width={20} height={20} alt="icon"/>
                    <span>{t('Duration')}: {hours}:{pad2(minutes)} {t('Hours')}</span>
                </p>
                : null}
            <p>
                <Image src={ticketSVG} width={20} height={20} alt="icon"/>
                <span>{t('Tickets')}: {t('from')} {price} USD</span>
            </p>
            <a className="button_basic" href={url}>{t('Book now')}</a>
        </div>
    )
}
