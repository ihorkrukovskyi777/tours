export type TourType = 'city' | 'tour' | 'sub-vendor' | 'system';



export interface DepBooking {
    avatar: string
    created_at: number
    date: string
    depId: number
    duration: number
    fullTime: string | null
    is_civitatis: boolean
    is_self_guide: boolean

    maxPerBooking: number

    maxPerDep: string
    ranking : number
    subVendorId: number
    subVendorName: string
    time : number
    tourId: number
    tourTitle: string
}

export interface CivitatisCategory {
    id: number;
    text: string;
    canBookAlone: boolean;
    group: any[];
}

export interface CivitatisRate {
    rate_id: number
    text: string
    categories: CivitatisCategory[]

}