import Button from "@/shared/ui/button/button"

export default function ButtonsInfo() {
    return (
        <div className="btn_wrap">
            <Button>Edit Booking</Button>
            <Button customClass="gray">Contact Your Guide</Button>
            <a className="button_custom gray" href="http://dev.oneporttest.com/cancel-book/?cancelCode=d619e1e3c3ce2d355c07058d30936f07df227c2a">Cancel Booking</a>
        </div>
    )
  }

