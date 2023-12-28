import Button from "@/shared/ui/button/button";
import CalendarSvg from "@/assets/images/svg/calendar-svg";
export default function OpenModalButton({locale, type, id}) {
    return (
        <Button>
            <div className="calendar_icon"><CalendarSvg/></div>
            <span>Pick a Date</span>
        </Button>
    )
}
