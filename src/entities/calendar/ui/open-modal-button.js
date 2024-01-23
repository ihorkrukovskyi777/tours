import {observer} from "mobx-react-lite";
import Button from "@/shared/ui/selectors/button/button";
import CalendarSvg from "@/assets/images/svg/calendar-svg";
import ModalBooking from "@/entities/calendar/ui/modal-booking";
import dynamic from "next/dynamic";

const Step1 = dynamic(
    () => import("@/entities/calendar/ui/modal-booking/step-1"),
    {
        ssr: false,
    }
)
const Step2 = dynamic(
    () => import("@/entities/calendar/ui/modal-booking/step-2"),
    {
        ssr: false,
    }
)

export default observer(function OpenModalButton({ storeModalCalendar }) {

    const {
        isOpened,
        open,
        isOpenedListDeparture,
        openListModal,
        closeListModal,
        departuresByDate,
        setDeparturesByDate,
        storeModalBooking: {
            setDeparture,
            open :  openModalBooking,
            isOpened: isOpenedBookingModal,
        }
    } = storeModalCalendar

    const onChange = (item) => {
        setDeparturesByDate(item.fullDate)
        openListModal();
    }

    const selectedDeparture = (dep) => {
        setDeparture(dep);
        openModalBooking();
    }

    return (
        <>
        <Button onClick={open}>
            <div className="calendar_icon"><CalendarSvg/></div>
            <span>Pick a Date</span>

        </Button>
            <ModalBooking show={isOpened}>
                {isOpened ? <Step1
                    storeModalCalendar={storeModalCalendar}
                    isEsc={isOpened && isOpenedListDeparture === false}
                    onChange={onChange}
                /> : null }
            </ModalBooking>
            <ModalBooking show={isOpenedListDeparture}>
                { isOpenedListDeparture ? <Step2
                    setDeparture={selectedDeparture}
                    departures={Object.values(departuresByDate).flat()}
                    storeModalCalendar={storeModalCalendar}
                    onBack={closeListModal}
                    isOpened={openListModal && isOpenedBookingModal === false}
                    close={closeListModal}
                /> : null }
            </ModalBooking>
            </>
    )
})
