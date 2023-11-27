//import PropTypes from 'prop-types';
import Image from "next/image";

export default function LanguagesSite({children , url , img}) {
  return ( 
          <li className="language"> 
            <a href={url}>
              <span className="wrap-txt">{children}</span>
              <Image src={img} alt="icon" />
            </a>
          </li>
      
  );
}


// Languages.propTypes = { 
//     languages: PropTypes.arrayOf(
//         PropTypes.shape({
//             url: PropTypes.string
//         })
//     )
// }