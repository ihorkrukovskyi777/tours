import {observer} from "mobx-react-lite";
import Button from "@/shared/ui/selectors/button/button";
import CalendarSvg from "@/assets/images/svg/calendar-svg";
import ModalBooking from "@/entities/calendar/ui/modal-booking";
import dynamic from "next/dynamic";
import Loader from "@/shared/ui/loaders/default-loader";

const Step1 = dynamic(
    () => import("@/entities/calendar/ui/modal-booking/step-1"),
    {
        ssr: false,
        loading: () => (
            <div style={{position: "relative"}}>
                <Loader/>
            </div>
        ),
    }
);
const Step2 = dynamic(
    () => import("@/entities/calendar/ui/modal-booking/step-2"),
    {
        ssr: false,
        loading: () => (
            <div style={{position: "relative"}}>
                <Loader/>
            </div>
        ),
    }
);

export default observer(function OpenModalButton({storeModalCalendar, i18n}) {
    const {
        isOpened,
        open,
        title,
        isOpenedListDeparture,
        openListModal,
        closeListModal,
        departuresByDate,
        setDeparturesByDate,
        storeModalBooking: {
            setDeparture,
            open: openModalBooking,
            isOpened: isOpenedBookingModal,
        },
    } = storeModalCalendar;

    const onChange = (item) => {
        setDeparturesByDate(item.fullDate);
        openListModal();
    };

    const selectedDeparture = (dep) => {
        setDeparture(dep);
        openModalBooking();
    };

    return (
        <>
            <Button onClick={open}>
                <div className="calendar_icon">
                    <CalendarSvg/>
                </div>
                <span>{i18n.pick_a_date}</span>
            </Button>
            <ModalBooking show={isOpened} size={'step-1'}>
                {isOpened ?
                    <Step1
                        i18n={i18n}
                        title={title}
                        storeModalCalendar={storeModalCalendar}
                        isEsc={isOpened && isOpenedListDeparture === false}
                        onChange={onChange}
                    /> : null}
            </ModalBooking>
            <ModalBooking show={isOpenedListDeparture} size={'step-2'}>
                {isOpenedListDeparture ?
                    <Step2
                        title={title}
                        i18n={{
                            departure_available: i18n.departure_available,
                            months: i18n.months,
                            days: i18n.days,
                            back: i18n.back
                        }}
                        setDeparture={selectedDeparture}
                        departures={Object.values(departuresByDate).flat()}
                        storeModalCalendar={storeModalCalendar}
                        onBack={closeListModal}
                        isOpened={openListModal && isOpenedBookingModal === false}
                        close={closeListModal}
                    />
                    : null}
            </ModalBooking>
        </>
    );
});
