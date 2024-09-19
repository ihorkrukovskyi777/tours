export const getContentFlexibleTitle = (flexible, locale) => {
    const page = flexible.pageMeta?.find(item => item.locale === locale);

    const global =  flexible.globalMeta?.find(item => item.locale === locale);

    return {
        title: page?.title?.trim() || global?.title
    }


}