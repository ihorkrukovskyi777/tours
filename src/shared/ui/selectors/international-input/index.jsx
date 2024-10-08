import {useState, useMemo, useRef, useEffect} from 'react';
import classNames from 'classnames';
import {InputMask} from '@react-input/mask';
import {localeFormat} from "@/shared/helpers/locale";
import IntlTelInput from '@/shared/ui/intl-tel-input/index';
import '@/shared/ui/intl-tel-input/style.css'

import './style.css';

export default function InternationalInput({
                                               locale, allPhoneNumbers, changeCountryCode = () => {
    }, handleChange, phoneDefault = ''
                                           }) {
    let formatLanguage = localeFormat(locale);
    formatLanguage = formatLanguage === 'en' ? 'GB' : formatLanguage;
    formatLanguage = formatLanguage === 'pt-pt' ? 'pt' : formatLanguage;
    formatLanguage = formatLanguage === 'cat' ? 'es' : formatLanguage;
    const languagePageSlug = formatLanguage.toUpperCase();
    const localizationWP = useMemo(() => {
        const values = {};
        allPhoneNumbers.map((elem) => {
            values[elem.code] = elem;
        });
        return values;
    }, [allPhoneNumbers]);
    const [validation_numbers, setValidation_numbers] = useState(localizationWP[languagePageSlug]['validation_numbers']);
    const [placeholder, setPlaceholder] = useState(localizationWP[languagePageSlug]['mask_number']);
    const [slugCountry, setSlugCountry] = useState(languagePageSlug);
    const getMask = placeholder.replace(/[0-9]/g, "_");
    const [maskView, setMaskView] = useState(getMask)
    const widthInputs = {1: 68, 2: 80, 3: 92, 4: 98, 5: 116, 6: 121};
    const [border, setBorder] = useState(false);
    const [inputCountryWidth, setInputCountryWidth] = useState(widthInputs[2]);


    const refPaddingLeft = useRef(null);
    function onPress(event) {
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
    }

    function onPasteValid(event) {
        let paste = (event.clipboardData || window.clipboardData).getData("text");
        if(!/^-?\d+\.?\d*$/.test(paste.replaceAll(' ', ''))) {
            event.preventDefault();
        }

    }

    const [inputTelWidth, setInputTelWidth] = useState(100);
    useEffect(() => {
        const config = {attributes: true, childList: true, subtree: true};
        const changeWidth = () => {
            const w = refPaddingLeft.current.querySelector('div').offsetWidth ?? 100;
            setInputTelWidth(w)
        }
        const observer = new MutationObserver(changeWidth)

        observer.observe(refPaddingLeft.current, config);

        changeWidth();

        return () => observer.disconnect();

    }, [])
    const handleFocus = () => setBorder(true);
    const handleBlur = () => setBorder(false);

    const localization = useMemo(() => {
        const values = {};
        for (const item of allPhoneNumbers) {
            values[item.code.toLowerCase()] = item.name
        }
        return values;
    }, [allPhoneNumbers])
    const defaultValueProp = phoneDefault ? {value: phoneDefault} : {}
    return (
        <div className={classNames({'border': border}, 'international-phone')}>
            <div className="wrap-input" style={{width: inputCountryWidth}} ref={refPaddingLeft}>

                <IntlTelInput
                    onChangeCountry={(val) => {

                        const find = window.intlTelInputGlobals.getCountryData().find(item => item.iso2 === val);
                        const value = find.dialCode;

                        const country = {
                            countryCode: find.iso2,
                            dialCode: find.dialCode,
                        }
                        setInputCountryWidth(widthInputs[value.length]);
                        window.requestAnimationFrame(() => {
                            document.getElementById("phone").value = '';
                            document.getElementById("phone").focus();
                        })
                        const selectedCountryData = country.countryCode.toUpperCase();
                        const placeholderInput = localizationWP[selectedCountryData]['mask_number'];
                        const maskInput = placeholderInput.replace(/[0-9]/g, "_");
                        setPlaceholder(placeholderInput);
                        setValidation_numbers(localizationWP[selectedCountryData]['validation_numbers'])
                        setMaskView(maskInput);
                        setBorder(true);
                        setSlugCountry(selectedCountryData)
                        changeCountryCode({dialCode: country.dialCode, slugCountry: selectedCountryData})
                    }}
                    initOptions={{
                        i18n: localization,
                        initialCountry: formatLanguage.toLowerCase(),
                        showSelectedDialCode: true,
                        countrySearch: false,
                        preferredCountries: [ 'us', 'gb'],

                    }}
                />
            </div>
            <InputMask
                id='phone'
                name='phone'
                {...defaultValueProp}
                mask={maskView}
                replacement="_"
                required
                placeholder={placeholder}
                style={{paddingLeft: inputTelWidth}}
                onChange={handleChange}
                validation-number={validation_numbers}
                onPaste={onPasteValid}
                onKeyPress={onPress}
                onFocus={handleFocus}
                onBlur={handleBlur}
                data-slug={slugCountry}
            />
        </div>

    );
}
