import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';
import classNames from 'classnames';
import { InputMask } from '@react-input/mask';
import { useState } from 'react';
import './style.css';

export default function InternationalInput({language , allPhoneNumbers , handleChange , valueMask=''}) {
    const [languagePageSlug , setLanguagePageSlug] = useState(language.toUpperCase());
    const [phonesArray , setPhonesArray] = useState(allPhoneNumbers);
    const localizationWP = [];
    Object.keys(phonesArray).map((elem) => {
        localizationWP[elem] = phonesArray[elem].name;
    });
    const  [validation_numbers , setValidation_numbers] = useState(phonesArray[languagePageSlug]['validation_numbers']);
    const [placeholder , setPlaceholder] = useState(phonesArray[languagePageSlug]['mask_number']);
    const getMask = placeholder.replace(/[0-9]/g, "_");
    const [maskView , setMaskView] = useState(getMask)
    const widthInputs = {1: 68 , 2: 80 , 3: 92, 4:98 , 5:116,  6: 121};
    const padding = 7;
    const [border , setBorder] = useState(false);
    const [inputCountryWidth , setInputCountryWidth] = useState(widthInputs[2]);

    function onPress(event) {
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
    }
    const handleFocus = (event) => {
        setBorder(true)
    };
    const handleBlur = (event) => {
        setBorder(false)
    };
    return ( 
    <div className={classNames({'border':border} , 'international-phone')}>
        <div className="wrap-input" style={{width: inputCountryWidth}}>
            <PhoneInput
                 country={language}
                localization={phonesArray}
                onChange={(value, country) => {          
                    //errors.phone = 'This field is requared';      
                    setInputCountryWidth(widthInputs[value.length]);
                    document.getElementById("phone").value = '';
                    document.getElementById("phone").focus();    
                    const selectedCountryData = country.countryCode.toUpperCase();
                    const placeholderInput = phonesArray[selectedCountryData]['mask_number'];
                    const maskInput = placeholderInput.replace(/[0-9]/g, "_");
                    setPlaceholder(placeholderInput);
                    setValidation_numbers(phonesArray[selectedCountryData]['validation_numbers'])
                    setMaskView(maskInput);
                    setBorder(true);
                }}
            />
        </div>
        <InputMask id='phone' name='phone'
            mask={maskView} replacement="_"
            placeholder={placeholder}
            style={{paddingLeft: inputCountryWidth + padding }}
            onChange={handleChange}
            validation-number={validation_numbers}
            onKeyPress={onPress} 
            onFocus={handleFocus}
            onBlur={handleBlur}
        />
    </div>
      
  );
}
