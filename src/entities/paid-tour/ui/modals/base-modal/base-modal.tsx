import React from "react";
import CloseImg from '@/assets/images/svg/close-svg'
import './base-modal.scss';



interface Props {
    children?: React.ReactNode;
    opened?: boolean;
    close?: () => void;
}

const BaseModal = ({children , opened = true , close} : Props) => {
    return (
        <>
            {opened &&
                <div className="base_modal">
                    <div className="base_modal_wrapper">
                        <div className="base_modal_content">
                            <div className="close">
                                <CloseImg height={20} width={20}/>
                            </div>
                            {children}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default BaseModal