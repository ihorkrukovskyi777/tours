'use client';
import {useLayoutEffect, useRef, useState} from 'react';

import './style.css';

export default function Button({children, color}) {
    const ref = useRef(null);
    const [widthButton, setWidthButton] = useState(0);

    useLayoutEffect(() => {
        setWidthButton(ref.current.offsetWidth);
    }, []);


    return (
        <button ref={ref}>
            {children}{widthButton}
            <span className="status" style={{backgroundColor: color}}> </span>
        </button>
    )
}
