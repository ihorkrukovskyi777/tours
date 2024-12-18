export interface DepLocales {
    code: string
    id: number
    name: string
    tour_id: number
    type: 'free' | 'self_guide'
}

export interface ActiveLocale {
    id: number,
    code: string,
    defaultLocale: string
}