'use client'
import { usePathname } from 'next/navigation'
import {useEffect} from "react";
import {useAnalytics} from "@entities/analytics/analytics.provider";

export function useHooksClearAnalytics() {
    const pathname = usePathname()
    const analytics = useAnalytics()

    useEffect(() => {
        return () => {
            return analytics?.clearEventLeftPageAfterRedirect(pathname);
        }
    }, [analytics, pathname])
}