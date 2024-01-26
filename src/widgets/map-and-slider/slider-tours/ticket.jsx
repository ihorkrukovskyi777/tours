import Image from "next/image";
import Link from "next/link";

import './style.css';



export default function Ticket({data}) {
    return (
        <div className="item-label">
            <p>
                <Image src={tourSVG} width={20} height={20} alt="icon"/>
                <span>title</span>
            </p>
            <p>

                <Image src={tourSVG} width={20} height={20} alt="icon"/>
                <span>duration: hours: minutes hour</span>
            </p>
            <p>
                <Image src={tourSVG} width={20} height={20} alt="icon"/>
                <span>Ticket: from 20 USD</span>
            </p>

            <Link className="button_basic" href="#">book_now</Link>
        </div>
  )
}
