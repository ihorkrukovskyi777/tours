import { useState, useMemo } from 'react';
import PhoneInput from "@/lib/react-phone/lib/lib"
import classNames from 'classnames';
import { InputMask } from '@react-input/mask';
import { localeFormat } from "@/shared/helpers/locale";
import '@/lib/react-phone/lib/style.css';
import './style.css';
export default function InternationalInput({locale , allPhoneNumbers, changeCountryCode = () => {}, handleChange , valueMask='', phoneDefault =''}) {
    let formatLanguage = localeFormat(locale);
    formatLanguage = formatLanguage === 'en' ? 'GB' : formatLanguage;
    formatLanguage = formatLanguage === 'pt-pt' ? 'pt' : formatLanguage;
    const languagePageSlug = formatLanguage.toUpperCase();
    const localizationWP = useMemo(() => {
        const values = {};
        allPhoneNumbers.map((elem) => {
            values[elem.code] = elem;
        });
        return values;
    }, [allPhoneNumbers]);
    const  [validation_numbers , setValidation_numbers] = useState(localizationWP[languagePageSlug]['validation_numbers']);
    const [placeholder , setPlaceholder] = useState(localizationWP[languagePageSlug]['mask_number']);
    const [slugCountry , setSlugCountry] = useState(languagePageSlug);
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
    const handleFocus = () => {
        setBorder(true)
    };
    const handleBlur = () => {
        setBorder(false)
    };

    const localization = useMemo(() => {
        const values = {};
        for (const item of allPhoneNumbers) {
            values[item.code.toLowerCase()] = item.name
        }
        return values;
    }, [allPhoneNumbers])
    const masks = useMemo(() => {
        const values = {};
        for (const item of allPhoneNumbers) {
            values[item.code.toLowerCase()] = item.mask_number
        }
        return values;
    }, [allPhoneNumbers])
    const defaultValueProp = phoneDefault ? { value: phoneDefault} : {}

    return (
    <div className={classNames({'border':border} , 'international-phone')}>
        <div className="wrap-input" style={{width: inputCountryWidth}}>
            <PhoneInput
                preferredCountries={['gb' ,'us']}
                country={formatLanguage.toLowerCase()}
                localization={localization}
                masks={masks}
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
                    setSlugCountry(selectedCountryData)
                    changeCountryCode({ dialCode: country.dialCode, slugCountry: selectedCountryData})
                }}
            />
        </div>
        <InputMask
            id='phone'
            name='phone'
            {...defaultValueProp}
            mask={maskView}
            replacement="_"
            placeholder={placeholder}
            style={{paddingLeft: inputCountryWidth + padding }}
            onChange={handleChange}
            validation-number={validation_numbers}
            onKeyPress={onPress}
            onFocus={handleFocus}
            onBlur={handleBlur}
            data-slug={slugCountry}

        />
    </div>

  );
}
