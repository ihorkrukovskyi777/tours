"use client";
import Button from "@/shared/ui/selectors/button/button";

export default function ButtonsInfo({
  isOpened,
  isOpenedModal,
  btnController,
}) {
  const { showEdit, showCancel, showContact } = btnController;
  console.log(btnController);
  return (
    <div className="btn_wrap">
      {(showEdit || showCancel) && (
        <Button onClick={isOpened}>Edit Booking</Button>
      )}
      {!showContact && (
        <Button customClass="gray" onClick={isOpenedModal}>
          Contact Your Guide
        </Button>
      )}
      {showCancel && (
        <a
          className="button_custom gray"
          href="http://dev.oneporttest.com/cancel-book/?cancelCode=d619e1e3c3ce2d355c07058d30936f07df227c2a"
        >
          Cancel Booking
        </a>
      )}
    </div>
  );
}
