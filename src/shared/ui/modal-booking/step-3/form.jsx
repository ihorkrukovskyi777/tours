
import { useState , useEffect } from 'react';

import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';




const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    const validateForm = errors => {
        let valid = true;  
        for (let value of Object.keys(errors)) {
            if(errors[value].length > 0) {
                valid = false
                break;
            }
        }
        return valid;
    };

export default function FormCalendar() {

    useEffect(() => {
        const input = document.querySelector("#phone");
        intlTelInput(input, {
            separateDialCode: true,
            formatOnDisplay: true,
            hiddenInput: "full_number",
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/intlTelInput.min.js"
        });

         input.addEventListener("countrychange", function() {
            console.log(111);
        });
    }, [])

    const [phone, setPhone] = useState('');
    const [country , setCountry] = useState('ua');
    const [loadvalidate , setLoadvalidate] = useState(false);
    const [validate , setValidate] = useState(null);
    const stateAll = {
        firstName: null,
        lastName: null,
        email: null,
        accept: null,
        errors: {
            firstName: '',
            lastName: '',
            email: '',
            accept: '',
        }
    }
    const [state , setState] = useState(stateAll);


    function handleChange(event)  {
        //event.preventDefault();
        const { name, value , checked } = event.target;
        let errors = state.errors;
        let hasNumber = /\d/;
        let errorMsg = '';   
        switch (name) {
          case 'firstName':
            if(value.length < 1 ) errorMsg = 'This field is requared' 
            if(value.length > 50) errorMsg = '"First name" max length is 50 symbols';
            if(hasNumber.test(value)) errorMsg = '"First name" should be without numbers';
            errors.firstName = errorMsg      
            break;

          case 'lastName': 
            if(value.length < 1 ) errorMsg = 'This field is requared';
            if(value.length > 50) errorMsg = '"First name" max length is 50 symbols'; 
            if(hasNumber.test(value)) errorMsg = '"First name" should be without numbers';
            errors.lastName = errorMsg
            break;

          case 'email': 
            errors.email = 
              validEmailRegex.test(value)
                ? ''
                : 'Email is not valid!';
            break;
        //   case 'phone': 
        //     if(value.length < 1 ) errorMsg = 'This field is requared';
        //     errors.lastName = errorMsg
        //     break;
          case 'accept':
            if(checked === false ) errorMsg = 'This field is requared';
            errors.accept = errorMsg  
            break;
          default:
            break;
        }

        setState({errors, [name]: value});
        !loadvalidate && setLoadvalidate(true); 
      }
    
      function handleSubmit(event) {
        event.preventDefault();
        if(validate === null) {
            errors.firstName = 'This field is requared';
            errors.lastName = 'This field is requared';
            errors.email = 'This field is requared';
            errors.accept = 'This field is requared';
        }

        if(validateForm(state.errors) && loadvalidate === true) {
          console.info('Valid Form');
          setValidate(true);
        }else{
          console.error('Invalid Form')
          setValidate(false);
        }
        console.log(state)
      }
  
  

    const {errors} = state;
  

    return ( 
        <form onSubmit={handleSubmit}>
            <div className="form-wrap">
                <div className="item-form"> 
                    <label htmlFor=""> 
                        <span>First Name<span className="red">*</span></span>
                        <input type='text' name='firstName' onChange={handleChange} />
                        {errors.firstName.length > 0 ? <span className='error-message'>{errors.firstName}</span> : null}
                        
                    </label>
                </div>
                <div className="item-form">
                    <label htmlFor=""> 
                        <span>Last Name<span className="red">*</span></span>
                        <input type='text' name='lastName' onChange={handleChange}  />
                        {errors.lastName.length > 0 ? <span className='error-message'>{errors.lastName}</span> : null}
                    </label>
                </div>
                <div className="item-form">
                    <label htmlFor=""> 
                        <span>Email<span className="red">*</span></span>
                        <input type='email' name='email' onChange={handleChange} />
                        {errors.email.length > 0 ? <span className='error-message'>{errors.email}</span> : null}

                    </label>
                </div>
                <div className="item-form">
                    <label htmlFor=""> 
                        <span>Phone Number<span className="red">*</span></span>
                        <div className="international-phone">
                            <input id='phone' />
                           
                        </div>
                    </label>
                </div>
                <div className="item-form full-width checkbox-item">
                    <div className="form-group">
                        <input type='checkbox' id="accept" name='accept' onChange={handleChange} />
                        <label htmlFor="accept">I accept all</label> 
                        <a href="/terms-and-conditions/" className="terms-and-conditions">Terms and Conditions</a> <span className="red">*</span>
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




