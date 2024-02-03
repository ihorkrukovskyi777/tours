import {seoLocales} from "@/shared/constants/locales-seo";

export const generatorSeo = (seo, canonical, locale) => {
    const isIndexation = process.env.NEXT_PUBLIC_GOOGLE_INDEXATION === 'yes';
    const isIndex = isIndexation ?  seo.index : false
    const isFollow = isIndexation  ?  seo.follow : false
    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_CANONICAL_DOMAIN),
        robots: {index: isIndex, follow: isFollow, 'max-image-preview': true, 'max-snippet': 1, 'max-video-preview': -1},
        title: seo.title,
        description: seo.description,
        openGraph: {
            ...seo.openGraph,
            url: canonical,
            locale: seoLocales[locale]
        },
        verification: {
            google: isIndexation ? 'mQKRBl_GbVi0Ly3Xwl9-M1pVM5Jm5y1O9Koi7Pj54M8' : '',
        },
        alternates: {
            canonical,
        }
    }
}