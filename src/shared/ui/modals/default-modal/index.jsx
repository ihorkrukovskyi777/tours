import classNames from 'classnames';
import './style.css';
import useEscHooks from "@/shared/hooks/use-esc-event";
import {useRef} from "react";

export default function DefaultModal({children, modalShow, isOpenedModal, size = 'default', halfOpacity = false}) {
    const bgRef = useRef(null)
    useEscHooks(isOpenedModal, modalShow);
    const opacity = halfOpacity ? {backgroundColor: `rgba(0, 0, 0, 0.3)`} : {}
    return (
        <div
            ref={bgRef}
            onClick={(e) => {
                if(e.target === bgRef.current) {
                    isOpenedModal();
                }
            }}
            className={classNames({'show_modal': modalShow}, 'default-modal transition')}
            style={opacity}
        >
            <div className={`modal_content ${size} `}>
                <div className="flex-wrap">
                    <span className="close-button" onClick={isOpenedModal}>×</span>
                    {children}
                </div>
            </div>
        </div>
    );
}

