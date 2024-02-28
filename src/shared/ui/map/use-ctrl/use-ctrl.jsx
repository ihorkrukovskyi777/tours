'use client'
import {useState, useRef, useEffect} from "react";
import './style.css'
export default function UseCtrl({ i18n }) {

    const refTime = useRef(null);
    const [isEnable, setEnable] = useState(true);
    const [style, setStyle] = useState({opacity: 0})

    const wheel = () => {
        setStyle({...style, opacity: 1})
        if(refTime.current) {
            clearTimeout(refTime.current)
        }
        refTime.current = setTimeout(() => {
            setStyle({...style, opacity: 0})
        }, 1000)
    };

    const remove = () => setEnable(false);

    useEffect(() => {
        if(window.innerWidth < 1199) {
            remove()
        }
    }, [])

    useEffect(() => {
        const onkeydown = () => remove()
        window.addEventListener('keydown', onkeydown)
        return () => window.removeEventListener('keydown', onkeydown)
    })

    if(!isEnable) {
        return null;
    }
    return (
        <div
            className="use_ctrl"
            style={style}
            onWheel={wheel}
            onClick={remove}
        >
            {i18n.use_ctrl}
        </div>
    )
}