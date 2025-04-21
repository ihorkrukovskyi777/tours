'use client'
import {useEffect} from "react";
import {useAnalytics} from "@entities/analytics/analytics.provider";
import {useLocale} from "use-intl";
interface Props { page_id: number | null}
export function useHookUpdatePageId({page_id} : Props) {
    const analytics = useAnalytics()
    const locale = useLocale();

    useEffect(() => {
        analytics?.updatePage(page_id, locale)
    }, [page_id, locale])
}

export function AnalyticsUpdate({page_id} : Props) {
    useHookUpdatePageId({page_id})
    return null
}