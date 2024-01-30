import classNames from "classnames";
import "./style.css";

export default function ModalBookingEdit({
  children,
  ModalShow,
  changeData,
}) {
  return (
    <div
      className={classNames(
        { show_modal: ModalShow },
        `custom_modal transition`
      )}
    >
      <div className={classNames("modal_content", { change: changeData })}>
        <div className="flex-wrap">{children}222</div>
      </div>
    </div>
  );
}
