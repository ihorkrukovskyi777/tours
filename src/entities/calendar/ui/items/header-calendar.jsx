import Image from "next/image";
import classNames from "classnames";
import ArrowRightSvg from "/public/images/svg/arrow-right.svg";
import ArrowLeftSvg from "/public/images/svg/arrow-left.svg";

export default function HeaderCalendar({month, year, prevMonth, nextMonth, disableArrow}) {
    const allMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <div className="header-calendar">
            <div className={classNames({'disable': !disableArrow}, 'prev-month')} onClick={prevMonth}>
                <Image src={ArrowLeftSvg} alt='arrow right'></Image>
            </div>
            <div className="month-and-year"><span>{allMonth[month]} &nbsp; {year}</span></div>
            <div className="next-month" onClick={nextMonth}><Image src={ArrowRightSvg} alt='arrow right'></Image></div>
        </div>
    );
}

