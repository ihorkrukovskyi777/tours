'use client';
import {useLayoutEffect, useRef, useState} from 'react';

import './style.css';

export default function Button({children}) {
  const ref = useRef(null);
  const [widthButtom, setWidthButton] = useState(0);

  useLayoutEffect(() => {
      setWidthButton(ref.current.offsetWidth);
  }, []);
 

    return (
      <button ref={ref}>{children}{widthButtom}<span class="status"></span></button>    
    )
}
