'use client'
import {useRef} from "react";
import classNames from 'classnames';
import './style.css';

export default function ModalBooking({
                                         style = {},
                                         children,
                                         show,
                                         changeData = undefined,
                                         size,
                                         halfOpacity = false,
                                         close = () => {
                                         },
                                         loader,
                                     }) {

    const bgRef = useRef(null)
    const opacity = halfOpacity ? {backgroundColor: `rgba(0, 0, 0, 0.3)`} : {}
    return (
        <div
            ref={bgRef}
            onClick={(e) => {
                if (e.target === bgRef.current) {
                    close();
                }
            }}
            className={classNames({'show_modal': show}, `custom_modal transition ${size}`)}
            style={{...opacity, visibility: show ? 'visible' : 'hidden', pointerEvents: show ? 'auto' : 'none'}}>
            <div style={{margin: '0 auto', position: 'relative',  maxWidth: '90%'}}>
                {loader}
                <div className={classNames('modal_content', {'change': changeData})} style={style}>
                    <div className="flex-wrap">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

