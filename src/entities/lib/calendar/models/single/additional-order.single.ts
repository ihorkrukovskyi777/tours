export class AdditionalOrderSingle {
    constructor() {
    }

    get id(): string | null {
        return window.sessionStorage.getItem('additionalOrderId')
    }

    set(id: string) {
        window.sessionStorage.setItem('additionalOrderId', id)
    }

    remove() {
        window.sessionStorage.removeItem('additionalOrderId')
    }
}