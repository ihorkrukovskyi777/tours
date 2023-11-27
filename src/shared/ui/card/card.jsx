import Image from 'next/image';
import styles from './style.module.css';
import DefaultImage from '@/assets/images/default-image.jpeg';

//import StarRatings from 'react-star-ratings';


export default function Card({img='' , url = '#' , title, children , size='small' , topElement, bottomElement}) {
  return (
    <div className='item_wrap'>
      <div className="item">   
          <Image className="img" src={DefaultImage} alt='test' /> 
          <div className="intro">
              <a href={url}>{title}</a>
          </div>
          {topElement}
          {bottomElement}
        </div>
        {children}
    </div>
  )
}
