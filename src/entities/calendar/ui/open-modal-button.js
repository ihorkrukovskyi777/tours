import {observer} from "mobx-react-lite";
import Button from "@/shared/ui/selectors/button/button";
import CalendarSvg from "@/assets/images/svg/calendar-svg";
import ModalBooking from "@/entities/calendar/ui/modal-booking";
import {useTranslation} from "@/i18n/client";
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

export default observer(function OpenModalButton({storeModalCalendar}) {
    const { t } = useTranslation();
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
                <span>{t('Pick a Date')}</span>
            </Button>
            <ModalBooking show={isOpened} size={'step-1'}>
                {isOpened ? <Step1
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
