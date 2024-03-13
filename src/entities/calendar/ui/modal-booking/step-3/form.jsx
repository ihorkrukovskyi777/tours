'use client'
import {useState, useRef} from 'react';
import {useParams} from "next/navigation";
import InternationalInput from '../../../../../shared/ui/selectors/international-input';
import {useRouter} from "next/navigation";
import {getHrefLocale} from "@/i18n/get-href-locale";
import classNames from "classnames";
import recaptcha from "@/shared/util/recaptcha";
import Link from "next/link";

export default function FormCalendar({i18n, allPhoneNumbers, locale, fetchBookingDeparture, errorsMessage, isLoading}) {

    const refForm = useRef();
    const [showError, setShowError] = useState(false);
    const {push} = useRouter();
    const params = useParams();
    //validation
    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    const validateForm = errors => {
        let valid = true;
        for (let value of Object.keys(errors)) {
            if (errors[value].length > 0) {
                valid = false
                break;
            }
        }
        return valid;
    };


    const [loadValidate, setLoadValidate] = useState(false);
    const [validate, setValidate] = useState(null);
    const [valueMask, setValueMask] = useState('');
    const stateAll = {
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
        accept: null,
        errors: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            accept: '',

        }
    }
    const [state, setState] = useState(stateAll);

    function validateSwitch(name) {
        setShowError(false);

        let hasNumber = /\d/;
        let errorMsg = '';
        let value = document.querySelector(`#booking input[name=${name}]`).value;
        let checked = document.querySelector(`#booking input[name=${name}]`).checked;
        switch (name) {
            case 'firstName':
                if (value.length < 1) errorMsg = i18n.errors.field_is_required
                if (value.length > 50) errorMsg = i18n.errors.first_name_max_length_is_50_symbols;
                if (hasNumber.test(value)) errorMsg = i18n.errors.first_name_should_be_without_numbers;
                errors.firstName = errorMsg
                break;

            case 'lastName':
                if (value.length < 1) errorMsg = i18n.errors.field_is_required;
                if (value.length > 50) errorMsg = i18n.errors.last_name_max_length_is_50_symbols;
                if (hasNumber.test(value)) errorMsg = i18n.errors.last_name_should_be_without_numbers;
                errors.lastName = errorMsg
                break;

            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : i18n.errors.email_error;
                break;
            case 'phone':
                const valuePhone = value.toString().replace(/ /g, '').replace(/[-()]/g, '').length;
                const validateArray = document.querySelector(`#booking input[name=${name}]`).getAttribute('validation-number').split(',').map(i => Number(i));
                if (!validateArray.includes(valuePhone)) {
                    errorMsg = i18n.errors.phone_number_error;
                }
                errors.phone = errorMsg
                break;
            case 'accept':
                if (checked === false) errorMsg = i18n.errors.field_is_required;
                errors.accept = errorMsg
                break;
            default:
                break;
        }
    }

    function handleChange(event) {
        //event.preventDefault();
        const {name} = event.target;
        let errors = state.errors;

        validateSwitch(name);
        setState({errors, [name]: value, });
        if (name === 'phone') {
            setValueMask(value);
        }


        !loadValidate && setLoadValidate(true);

    }

   async function handleSubmit(event) {
        event.preventDefault();
        if (validate === null) {
            errors.firstName = i18n.errors.field_is_required;
            errors.lastName = i18n.errors.field_is_required;
            errors.email = i18n.errors.field_is_required;
            errors.phone = i18n.errors.field_is_required;
            errors.accept = i18n.errors.field_is_required;
            document.querySelectorAll('#booking input').forEach((item) => {
                if (item.hasAttribute('name')) {
                    validateSwitch(item.getAttribute('name'));
                    setState({errors, [name]: value});
                }
            });
            !loadValidate && setLoadValidate(true);
        }
        
        if (validateForm(state.errors) && loadValidate === true) {
            setValidate(true);
            //REDIRECT TO CHECKOUT PAGE
            const formData = {
                firstName: document.getElementsByName('firstName')[0].value,
                lastName: document.getElementsByName('lastName')[0].value,
                email: document.getElementsByName('email')[0].value,
                phone_county_code: document.querySelector('.international-phone .iti__selected-dial-code').innerText,
                phone: document.getElementsByName('phone')[0].value,
                phone_country_slug: document.getElementById('phone').getAttribute('data-slug').toLowerCase(),
            }
            try {
                const token = await recaptcha("booking");
                const data = await fetchBookingDeparture(formData, token);
                if(data.booking_id) {
                    const url = getHrefLocale(params.locale, `checkout?code=${data.booking_id}`)
                    push(url)
                }

            } catch (err) {
                console.log(err);
            }

        } else {
            console.error('Invalid Form')
            setValidate(false);
            showMsg();
        }
    }


    const {errors} = state;

    const value = null

    function showMsg() {
        if (refForm.current.checkValidity() === false) {
            setShowError(false);
        } else {
            setShowError(true);
        }

    }

    // end validation


    return (
        <form onSubmit={handleSubmit} id='booking' ref={refForm}>
            <div className="form-wrap">
                <div className="item-form">
                    <label htmlFor="">
                        <span>{i18n.first_name}<span className="red">*</span></span>
                        <input type='text' name='firstName' required onChange={handleChange}/>
                        {showError && errors.firstName.length > 0 ? <span className='error-message'>{errors.firstName}</span> : null}
                    </label>
                </div>
                <div className="item-form">
                    <label htmlFor="">
                        <span>{i18n.last_name}<span className="red">*</span></span>
                        <input type='text' name='lastName' onChange={handleChange} required/>
                        {showError && errors.lastName.length > 0 ? <span className='error-message'>{errors.lastName}</span> : null}
                    </label>
                </div>
                <div className="item-form">
                    <label htmlFor="">
                        <span>{i18n.email}<span className="red">*</span></span>
                        <input type='email' name='email' onChange={handleChange} required/>
                        {showError && errors.email.length > 0 ? <span className='error-message'>{errors.email}</span> : null}
                    </label>
                </div>
                <div className="item-form">
                    <div className="label">
                        <span>{i18n.phone_number}<span className="red">*</span></span>
                        <InternationalInput
                            locale={locale}
                            allPhoneNumbers={allPhoneNumbers}
                            handleChange={handleChange}
                            valueMask={valueMask}
                        />
                        {showError && errors.phone.length > 0 ? <span className='error-message'>{errors.phone}</span> : null}
                    </div>

                </div>
                <div className="item-form full-width checkbox-item">
                    <div className="form-group">
                        <input type='checkbox' id="accept" name='accept' onChange={handleChange} required/>
                        <label htmlFor="accept">{i18n.i_accept_all}</label>
                        <Link href="/terms-and-conditions/" target="_blank" className="terms-and-conditions">{i18n.terms_and_conditions}</Link> <span
                        className="red">*</span>
                    </div>
                </div>
            </div>
            <ul className="general-error">
                {errorsMessage?.map((value, index) => <li key={index} dangerouslySetInnerHTML={{__html: value ?? ''}}></li>)}
            </ul>
            <div className="btns-wrap">
                <button className='button_custom' onClick={showMsg}>{i18n.book_now}</button>
                <div className={classNames({'show-loader': isLoading}, 'calendar_choose_date_loader')}   id="calendar_choose_date_loader">
                    <div className="lds-dual-ring"></div>
                </div>
            </div>
        </form>
    )
}




