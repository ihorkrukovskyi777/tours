import {useLayoutEffect, useState} from "react";

export interface ModelImpl {
    init(): void
    dispose(): void
}
type Callback = () => ModelImpl;
export function useClientModel<T>(callback: Callback): T {
    const [model] = useState(callback)

    useLayoutEffect(() => {
        model.init()
        return () => {
            model.dispose()
        }
    }, [model])

    return model as T
}