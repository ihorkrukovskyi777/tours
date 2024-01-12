'use client'
import { useEffect } from "react";

export default function useEscHooks(callback, isOpened) {
    useEffect(() => {

        if(isOpened) {
            const escEvent = ({ code }) => {
                if(code !== 'Escape')
                    return;
                callback();
            }
            window.addEventListener('keyup', escEvent);

            return () => window.removeEventListener('keyup', escEvent);
        }


    }, [isOpened])
}
