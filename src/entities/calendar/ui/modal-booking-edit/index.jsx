import classNames from "classnames";
import "./style.css";

export default function ModalBookingEdit({
  children,
  ModalShow,
  changeData,
  isOpened,
  size
}) {
  return (
    <div
      className={classNames(
        { show_modal: ModalShow },
        `custom_modal transition`
      )}
    >
      <div className={classNames("modal_content", { change: changeData })}>
        <div className="flex-wrap">{children}</div>
      </div>
    </div>
  );
}
