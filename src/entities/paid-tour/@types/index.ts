export interface Iimage {
    id?: number
    src: string | null,
    alt: string
}

export interface Itinerary {
    id: number;
    title: string;
    body: string;

    index: number;

    location: {
        address: string;
        city: string;
        countryCode: string;
        postCode: string;
        latitude: number | null;
        longitude: number | null;
        zoomLevel: number;
        origin: unknown;
        originId: unknown;
        wholeAddress: string;
    };
}
export interface CardExperience {
    id: number;
    image: Iimage;
    duration: number;
    slug: string;
    locale: string;
    price: {
        amount: number,
        currency: string
    },
    bokun: {
        id: number;
        locales: string[];
    };
    city: {
        id: number;
        slug: string;
        locale: string
    };
    title: string;
    photos: Iimage[];
}


export interface BokunTourBanner extends CardExperience {
    excerpt: string
}
export interface BokunTourInfo {
    page_id: number
    description: string;
    excluded: string;
    included: string;
    attention: string;
    requirements: string;
}
export interface Itinerary {
    id: number;
    title: string;
    body: string;

    index: number;

    location: {
        address: string;
        city: string;
        countryCode: string;
        postCode: string;
        latitude: number | null;
        longitude: number | null;
        zoomLevel: number;
        origin: unknown;
        originId: unknown;
        wholeAddress: string;
    };
}
