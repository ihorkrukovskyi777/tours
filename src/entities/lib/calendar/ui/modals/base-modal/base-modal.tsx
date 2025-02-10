import React from "react";
import CloseImg from '@/assets/images/svg/close-svg'
import Loader from '@shared/ui/loaders/default-loader';
import './base-modal.scss';


interface Props {
    children?: React.ReactNode;
    opened?: boolean;
    close?: () => void;
    maxWidth?: number
    isLoading?: boolean
}

const BaseModal = ({children, opened = true, close, maxWidth, isLoading = false}: Props) => {
    const style = maxWidth ? {maxWidth} : {}
    const onClose = close ?? (() => {
    });
    return (
        <>
            {opened &&
                <div className="base_modal">
                    <div className="base_modal_wrapper">
                        <div style={{position: 'relative'}}>
                        {
                            isLoading &&  <Loader style={{left: 0, opacity: '0.7', zIndex: 5}}/>
                        }
                        <div className="base_modal_content" style={style}>

                            <div className="close" onClick={onClose}>
                                <CloseImg height={20} width={20}/>
                            </div>
                            {children}
                        </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default BaseModal