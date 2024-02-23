'use client';
import classNames from "classnames";
import './style.css';

export default function ButtonLoader({
                                         children,
                                         isLoading = false,
                                         onClick = () => {
                                         },
                                         disabled = false,
                                         size = 'medium',
                                         isSubmit= false
                                     }) {


    const event = (e) => {
        if(isSubmit) return

        e.preventDefault();
        onClick();
    }

    return (
        <button className={classNames('button_loader', size)} onClick={event} disabled={disabled || isLoading}>
            {children}
            {isLoading ?
                <div className="button_loader__bg">
                    <div className="button_loader__circle"></div>
                </div>
                : null}
        </button>

    )
}
