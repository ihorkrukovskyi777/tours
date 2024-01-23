import Image from 'next/image';
import './style.css';

export default function Button({children , icon = null ,customClass='' }) {
    return (
        <button className={`button_custom ${customClass}`} >
            {children}
            {icon ? <Image src={icon} alt='icon' /> : null}
        </button>
  )
}
