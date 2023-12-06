'use client'
import './style.css';
import classNames from 'classnames';


export default function ModalBooking({children , ModalShow  , changeData }) {
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

