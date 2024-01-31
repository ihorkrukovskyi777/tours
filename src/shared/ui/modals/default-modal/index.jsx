import classNames from 'classnames';
import './style.css';
import useEscHooks from "@/shared/hooks/use-esc-event";

export default function DefaultModal({children, modalShow, isOpenedModal, size = 'default'}) {

    useEscHooks(isOpenedModal, modalShow)
    return (
        <div className={classNames({'show_modal': modalShow}, 'default-modal transition')}>
            <div className={`modal_content ${size} `}>
                <div className="flex-wrap">
                    <span className="close-button" onClick={isOpenedModal}>×</span>
                    {children}
                </div>
            </div>
        </div>
    );
}

