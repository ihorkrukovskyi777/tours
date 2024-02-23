import Image from "next/image";
import classNames from "classnames";
import ArrowRightSvg from "/public/images/svg/arrow-right.svg";
import ArrowLeftSvg from "/public/images/svg/arrow-left.svg";
const allMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function HeaderCalendar({i18n, month, year, prevMonth, nextMonth, disableArrow}) {

    return (
        <div className="header-calendar">
            <div className={classNames({'disable': !disableArrow}, 'prev-month')} onClick={prevMonth}>
                <Image src={ArrowLeftSvg} alt='arrow right'></Image>
            </div>
            <div className="month-and-year"><span>{i18n.months[allMonth[month]]} {year}</span></div>
            <div className="next-month" onClick={nextMonth}><Image src={ArrowRightSvg} alt='arrow right'></Image></div>
        </div>
    );
}

