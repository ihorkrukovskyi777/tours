'use client'
import {useState} from 'react';
import InternationalInput from '../../../../../shared/ui/selectors/international-input';


export default function FormCalendar({allPhoneNumbers, locale}) {

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
        let hasNumber = /\d/;
        let errorMsg = '';
        let value = document.querySelector(`#booking input[name=${name}]`).value;
        let checked = document.querySelector(`#booking input[name=${name}]`).checked;
        switch (name) {
            case 'firstName':
                if (value.length < 1) errorMsg = 'This field is requared'
                if (value.length > 50) errorMsg = '"First [name]" max length is 50 symbols';
                if (hasNumber.test(value)) errorMsg = '"First [name]" should be without numbers';
                errors.firstName = errorMsg
                break;

            case 'lastName':
                if (value.length < 1) errorMsg = 'This field is requared';
                if (value.length > 50) errorMsg = '"First [name]" max length is 50 symbols';
                if (hasNumber.test(value)) errorMsg = '"First [name]" should be without numbers';
                errors.lastName = errorMsg
                break;

            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'phone':
                const valuePhone = value.toString().split('').filter(e => e.trim().length).join('').length;
                const validateArray = document.querySelector(`#booking input[name=${name}]`).getAttribute('validation-number').split(',').map(i => Number(i));
                if (!validateArray.includes(valuePhone)) {
                    errorMsg = '"Phone number" has an invalid format';
                }
                errors.phone = errorMsg
                break;
            case 'accept':
                if (checked === false) errorMsg = 'This field is requared';
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
        setState({errors, [name]: value});
        if (name === 'phone') {
            setValueMask(value);
        }
        !loadValidate && setLoadValidate(true);

    }

    function handleSubmit(event) {
        event.preventDefault();
        if (validate === null) {
            errors.firstName = 'This field is requared';
            errors.lastName = 'This field is requared';
            errors.email = 'This field is requared';
            errors.phone = 'This field is requared';
            errors.accept = 'This field is requared';
            document.querySelectorAll('#booking input').forEach((item) => {
                if (item.hasAttribute('name')) {
                    validateSwitch(item.getAttribute('name'));
                    setState({errors, [name]: value});
                }
            });
            !loadValidate && setLoadValidate(true);
        }

        if (validateForm(state.errors) && loadValidate === true) {
            console.info('Valid Form');
            setValidate(true);
            //REDIRECT TO CHECKOUT PAGE
            const formData = {
                firstName: document.querySelector("#booking input[name=firstName]").value,
                lastName: document.querySelector("#booking input[name=lastName]").value,
                email: document.querySelector("#booking input[name=email]").value,
                phone_country: document.querySelector("#booking .react-tel-input input").value,
                phone: document.querySelector("#booking input[name=phone]").value,
                accept: document.querySelector("#booking input[name=accept]").value,
            }
            console.log(formData , 'formData')
        } else {
            console.error('Invalid Form')
            setValidate(false);
        }
    }



    const {errors} = state;

    const [value, setValue] = useState(null);

    // end validation


    return (
        <form onSubmit={handleSubmit} id='booking'>
            <div className="form-wrap">
                <div className="item-form">
                    <label htmlFor="">
                        <span>First Name<span className="red">*</span></span>
                        <input type='text' name='firstName' onChange={handleChange}/>
                        {errors.firstName.length > 0 ? <span className='error-message'>{errors.firstName}</span> : null}

                    </label>
                </div>
                <div className="item-form">
                    <label htmlFor="">
                        <span>Last Name<span className="red">*</span></span>
                        <input type='text' name='lastName' onChange={handleChange}/>
                        {errors.lastName.length > 0 ? <span className='error-message'>{errors.lastName}</span> : null}
                    </label>
                </div>
                <div className="item-form">
                    <label htmlFor="">
                        <span>Email<span className="red">*</span></span>
                        <input type='email' name='email' onChange={handleChange}/>
                        {errors.email.length > 0 ? <span className='error-message'>{errors.email}</span> : null}

                    </label>
                </div>
                <div className="item-form">
                    <label htmlFor="">
                        <span>Phone Number<span className="red">*</span></span>
                        <InternationalInput
                            locale={locale}
                            allPhoneNumbers={allPhoneNumbers}
                            handleChange={handleChange}
                            valueMask={valueMask}
                        />
                        {errors.phone.length > 0 ? <span className='error-message'>{errors.phone}</span> : null}
                    </label>

                </div>
                <div className="item-form full-width checkbox-item">
                    <div className="form-group">
                        <input type='checkbox' id="accept" name='accept' onChange={handleChange}/>
                        <label htmlFor="accept">I accept all</label>
                        <a href="/terms-and-conditions/" className="terms-and-conditions">Terms and Conditions</a> <span
                        className="red">*</span>
                    </div>
                    {errors.accept.length > 0 ? <span className='error-message'>{errors.accept}</span> : null}
                </div>
            </div>

            <div className="btns-wrap">
                <button className='button_custom'>Book Now</button>
                <div className="calendar_choose_date_loader hidden" id="calendar_choose_date_loader">
                    <div className="lds-dual-ring"></div>
                </div>
            </div>
        </form>
    )
}




