import {useEffect, useRef} from "react";

import classNames from 'classnames';
import './style.css';
import useEscHooks from "@/shared/hooks/use-esc-event";

export default function ModalBooking({children, show, changeData , size}) {
    return (
        <div className={classNames({'show_modal': show}, `custom_modal transition ${size}`)}>
            <div className={classNames('modal_content', {'change': changeData})}>
                <div className="flex-wrap">
                    {children}
                </div>
            </div>
        </div>
    );
}

