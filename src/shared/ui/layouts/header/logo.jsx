import Image from 'next/image';
import LogoSvg from '@/assets/images/svg/logo.svg';

export default function Logo() {
    return (
        <Image src={LogoSvg} priority={true} alt="logo"/>
    );
}
