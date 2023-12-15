import classNames from 'classnames';
import './style.css';



export default function EditModalTour({children , ModalShow }) {


  return (
    <div className={classNames({'show_modal': ModalShow} , 'edit_tour_modal transition')}>
        <div className="modal_content">
            <div className="flex-wrap">
                {children}
            </div>
        </div>
    </div>
  );
}

