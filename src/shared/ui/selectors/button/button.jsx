'use client';
import Image from 'next/image';
import './style.css';

export default function Button({children , icon = null , onClick= () => {} , prevent=false , customClass='' }) {
    return (
        <button className={`button_custom ${customClass}`}
            onClick={ (e) => {
                if(prevent) {
                    e.preventDefault();
                }
                    onClick();
                }
            }
        >
            {children}
            {icon ? <Image src={icon} alt='icon' /> : null}
        </button>
  )
}
