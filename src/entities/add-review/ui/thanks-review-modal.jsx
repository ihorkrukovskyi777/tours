'use client'
import {useState} from "react";
import DefaultModal from "@/shared/ui/modals/default-modal";

const style = {
    fontWeight: 700,
    fontFamily: 'var(--font_700)',
    fontSize: '36px',
    textAlign: 'center',
    lineHeight: 1.05,
    padding: '20px 0',
    zIndex: 9999,
}
export default function ThanksReviewModal({message}) {
    const [isOpen, setOpen] = useState(true);
    const close = () => setOpen(false);
    return (
        <DefaultModal modalShow={isOpen} isOpenedModal={close}>
            <div style={style}>
                {message}
            </div>
        </DefaultModal>
    )
}