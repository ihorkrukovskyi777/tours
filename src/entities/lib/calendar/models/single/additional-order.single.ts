import localstorageTtl from "@shared/helpers/localstorage-ttl";
export class AdditionalOrderSingle {
    constructor() {
    }

    get id(): string | null {
        return localstorageTtl.get('additionalOrderId')
    }

    set(id: string) {
        localstorageTtl.set('additionalOrderId', id, 1000 * 60 * 60)
    }

    remove() {
        localstorageTtl.remove('additionalOrderId')
    }
}