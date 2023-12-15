import classNames from 'classnames';
import './style.css';

export default function DefaultModal({children , modalShow , isOpenedModal , size = 'default'}) {

 
return (
    <div className={classNames({'show_modal': modalShow} , 'default-modal transition')}>
        <div className={`modal_content ${size} `}>
            <div className="flex-wrap">
                <span className="close-button" onClick={isOpenedModal}>×</span>
                {children}
            </div>
        </div>
    </div>
  );
}

