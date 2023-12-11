import classNames from 'classnames';
import './style.css';

export default function ModalBooking({children , ModalShow  , changeData , allPhoneNumbers }) {


  return (
    <div className={classNames({'show_modal': ModalShow} , 'custom_modal transition')}>
        <div className={classNames('modal_content' , {'change': changeData})}>
            <div className="flex-wrap">
                {children}
            </div>
        </div>
    </div>
  );
}

