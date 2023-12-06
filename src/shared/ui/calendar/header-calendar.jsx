import classNames from "classnames";
import ArrowRightSvg from "@/assets/images/svg/arrow-right-svg";
import ArrowleftSvg from "@/assets/images/svg/arrow-left-svg";

export default function HeaderCalendar({month , year , prevMonth , nextMonth , disableArrow}) {
    const allMonth =  ["January","February","March","April","May","June","July","August","September","October","November","December"];
  
    return (
        <div className="header-calendar">
            <div className={classNames({'disable':!disableArrow} , 'prev-month')} onClick={prevMonth}><ArrowleftSvg /></div>
            <div className="month-and-year"><span>{allMonth[month]} &nbsp; {year}</span></div>
            <div className="next-month" onClick={nextMonth}><ArrowRightSvg /></div>
        </div>
      );
    }
    
    