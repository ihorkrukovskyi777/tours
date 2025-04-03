'use client'
import {createContext, ReactNode, useContext, useEffect} from "react";
import {AnalyticsModel} from "@entities/analytics/analytics.model";
import {useClientModel} from "@shared/hooks/use-client-model";
import {useHooksClearAnalytics} from "@entities/analytics/hooks/clear-left-the-page-hook.use";

const AnalyticsContext = createContext<AnalyticsModel | null>(null);

interface Props {
    children: ReactNode
}

export function useAnalytics() {
    return useContext(AnalyticsContext)
}

const AnalyticsProvider = ({children}: Props) => {



    const model = useClientModel<AnalyticsModel>(() => new AnalyticsModel())


    useHooksClearAnalytics()

    return (
        <AnalyticsContext.Provider value={model}>
            {children}
        </AnalyticsContext.Provider>
    );
}


export default AnalyticsProvider