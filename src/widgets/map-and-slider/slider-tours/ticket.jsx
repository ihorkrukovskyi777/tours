import Image from "next/image";
import Link from "next/link";
import heartSVG from '../../../../public/images/svg/tour.svg';
import clockSVG from '../../../../public/images/svg/tour.svg';
import tiketsSVG from '../../../../public/images/svg/tour.svg';




export default function Ticket({data}) {

    //const {title , duration , tickets } = data;

    return (
        <div className="item-label">
            <p>
                <Image src={heartSVG} width={20} height={20} alt="icon"/>
                <span>title</span>
            </p>
            <p>
                <Image src={clockSVG} width={20} height={20} alt="icon"/>
                <span>Duration: 20 : 30 Hours</span>
            </p>
            <p>
                <Image src={tiketsSVG} width={20} height={20} alt="icon"/>
                <span>Tickets: from 20.22 USD</span>
            </p>
            <Link className="button_basic" href="#">Book now</Link>
        </div>
  )
}
