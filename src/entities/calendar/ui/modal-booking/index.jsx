'use client'
import {useRef} from "react";
import classNames from 'classnames';
import './style.css';

export default function ModalBooking({
                                         children, show, changeData = undefined, size, halfOpacity = false, close = () => {
    }
                                     }) {

    const bgRef = useRef(null)
    const opacity = halfOpacity ? {backgroundColor: `rgba(0, 0, 0, 0.3)`} : {}
        return (
        <div
            ref={bgRef}
            onClick={(e) => {
                if(e.target === bgRef.current) {
                    close();
                }
            }}
            className={classNames({'show_modal': show}, `custom_modal transition ${size}`)}
            style={{...opacity, visibility: show ? 'visible' : 'hidden', pointerEvents: show ? 'auto' : 'none'}}>
            <div className={classNames('modal_content', {'change': changeData})}>
                <div className="flex-wrap">
                    {children}
                </div>
            </div>
        </div>
    );
}

