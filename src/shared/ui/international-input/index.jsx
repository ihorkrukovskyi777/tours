import { useState } from 'react';
import PhoneInput from 'react-phone-input-2'
import classNames from 'classnames';
import { InputMask } from '@react-input/mask';
import { localeFormat } from "@/shared/hepers/locale";
import 'react-phone-input-2/lib/style.css';

import './style.css';

export default function InternationalInput({locale , allPhoneNumbers , handleChange , valueMask=''}) {
    let formatLanguage = localeFormat(locale);
    formatLanguage = formatLanguage === 'en' ? 'GB' : formatLanguage;
    formatLanguage = formatLanguage === 'pt-pt' ? 'pt' : formatLanguage;
    const languagePageSlug = formatLanguage.toUpperCase();
    const localizationWP = {};
    allPhoneNumbers.map((elem) => {
        localizationWP[elem.code] = elem;
    });
    const  [validation_numbers , setValidation_numbers] = useState(localizationWP[languagePageSlug]['validation_numbers']);
    const [placeholder , setPlaceholder] = useState(localizationWP[languagePageSlug]['mask_number']);
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
                country={formatLanguage}
                localization={formatLanguage.toLowerCase()}
                onChange={(value, country) => {
                    //errors.phone = 'This field is requared';
                    setInputCountryWidth(widthInputs[value.length]);
                    document.getElementById("phone").value = '';
                    document.getElementById("phone").focus();
                    const selectedCountryData = country.countryCode.toUpperCase();

                    const placeholderInput = localizationWP[selectedCountryData]['mask_number'];
                    const maskInput = placeholderInput.replace(/[0-9]/g, "_");
                    setPlaceholder(placeholderInput);
                    setValidation_numbers(localizationWP[selectedCountryData]['validation_numbers'])
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
