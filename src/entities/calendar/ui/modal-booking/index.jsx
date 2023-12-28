import classNames from 'classnames';
import './style.css';

export default function ModalBooking({children , show  , changeData , allPhoneNumbers }) {


  return (
    <div className={classNames({'show_modal': show} , 'custom_modal transition')}>
        <div className={classNames('modal_content' , {'change': changeData})}>
            <div className="flex-wrap">
                {children}
            </div>
        </div>
    </div>
  );
}

