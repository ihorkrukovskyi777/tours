import {makeAutoObservable} from "mobx";

export enum MODAL {
    'CALENDAR',
    'DAY_LIST',
    'FORM_BOOKING',
    'ADDITIONAL_SALES',
    'ADDITIONAL_SALES_CALENDAR',
    'ADDITIONAL_SALES_DEP_DAY',
    'COUPON_MODAL',
    'PAID_TOURS_MODAL',
    'SUCCESS_SEND_EMAIL'
}

type ModalT = {[key in MODAL]: { index: number, visibly: boolean, zIndex: number | null}}


export class ModalStepsModel {
    modals: ModalT = {
        [MODAL.CALENDAR]: { index: 0, visibly: false, zIndex: null},
        [MODAL.DAY_LIST]: { index: 1, visibly: false, zIndex: null},
        [MODAL.FORM_BOOKING]: { index: 2, visibly: false, zIndex: null},
        [MODAL.ADDITIONAL_SALES]: { index: 3, visibly: false, zIndex: null},
        [MODAL.ADDITIONAL_SALES_CALENDAR]: { index: 4, visibly: false, zIndex: null},
        [MODAL.ADDITIONAL_SALES_DEP_DAY]: { index: 5, visibly: false, zIndex: null},
        [MODAL.COUPON_MODAL]: { index: 5, visibly: false, zIndex: null},
        [MODAL.PAID_TOURS_MODAL]: { index: 5, visibly: false, zIndex: null},
        [MODAL.SUCCESS_SEND_EMAIL]: { index: 6, visibly: false, zIndex: null},
    }

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    private addOverflow() {
        const body = document.querySelector('body')
        if(body) {
            body.style.overflow = 'hidden'
        }
    }
    private removeOverflow() {
        const body = document.querySelector('body')
        const modelsOpenEmpty = Object.values(this.modals).filter(v => v.visibly).length === 0
        if(body && modelsOpenEmpty) {
            body.style.overflow = 'auto'
        }
    }
    openModal(name: MODAL, zIndex: number | null = null) {
        this.modals[name].visibly = true
        this.modals[name].zIndex = zIndex
        this.addOverflow();
    }

    closeModal(name: MODAL) {
        this.modals[name].visibly = false
        this.removeOverflow();
    }

    closeAllExceptByName(name: MODAL) {
        for (const key in this.modals) {
            if (Number(key) === name)
                continue;

            this.closeModal(Number(key))
        }
    }
}
