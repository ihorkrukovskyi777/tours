'use client'
import EditSvg from "@/assets/images/svg/edit-svg"
import { useState } from "react";
import Button from "@/shared/ui/button/button";
import InternationalInput from "@/shared/ui/international-input";



export default function FormEdit({isOpened , allPhoneNumbers }) {


//validation
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
const idForm = '#edit_tour';
const [firstName, setFirstName] = useState('Ihor');
const [lastName, setLastName] = useState('Krukovskyi');
const [email, setEmail] = useState('test@gmail.com');
const [phone, setPhone] = useState('123 212 131');
const stateAll = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    errors: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    }
}

const [state , setState] = useState(stateAll);
function validateSwitch(name) {
    let hasNumber = /\d/;
    let errorMsg = '';
    let value = document.querySelector(`${idForm} input[name=${name}]`).value;
    
    switch (name) {
        case 'firstName':
          setFirstName(value); 
          if(value.length < 1 ) errorMsg = 'This field is requared' 
          if(value.length > 50) errorMsg = '"First name" max length is 50 symbols';
          if(hasNumber.test(value)) errorMsg = '"First name" should be without numbers';
          errors.firstName = errorMsg      
          break;

        case 'lastName': 
          setLastName(value);
          if(value.length < 1 ) errorMsg = 'This field is requared';
          if(value.length > 50) errorMsg = '"First name" max length is 50 symbols'; 
          if(hasNumber.test(value)) errorMsg = '"First name" should be without numbers';
          errors.lastName = errorMsg
          break;

        case 'email': 
          setEmail(value);
          errors.email = 
            validEmailRegex.test(value)
              ? ''
              : 'Email is not valid!';
          break;
        case 'phone':
          setPhone(value);
          const valuePhone = value.toString().split('').filter(e => e.trim().length).join('').length;
          const validateArray = document.querySelector(`${idForm} input[name=${name}]`).getAttribute('validation-number').split(',').map(i=>Number(i));
          if(!validateArray.includes(valuePhone)) {
              errorMsg = '"Phone number" has an invalid format';
          }         
          errors.phone = errorMsg
          break;
        default:
          break;
      }
}

function handleChange(event)  {
    event.preventDefault();
    const { name  } = event.target;
    let errors = state.errors;
    validateSwitch(name);   
    setState({errors, [name]: value});
    console.log(state);
}

function handleSubmit(event) {
    event.preventDefault();
    if(validateForm(state.errors)) {
      console.info('Valid Form');
      
    }else{
      console.error('Invalid Form')
    }

}

const {errors} = state;

const [value , setValue] = useState(null);

function borderSet() {
    setBorder(true)
}
function borderReset() {
    setBorder(false)
}
// end validation

function closeModal() {
    if(validateForm(state.errors)) isOpened();
}
function onPress(event) {
    if (!/[0-9]/.test(event.key)) {
        event.preventDefault();
    }
}




    return (
        <form id='edit_tour' onSubmit={handleSubmit}>
            <div className="item">
                <label htmlFor="">First Name</label>
                <input type='text' name='firstName' onChange={handleChange} value={firstName} />
                {errors.firstName.length > 0 ? <span className='error-message'>{errors.firstName}</span> : null}
                <EditSvg/>
            </div>
            <div className="item">
                <label htmlFor="">Last Name</label>
                <input type='text' name='lastName' onChange={handleChange} value={lastName}  />
                {errors.lastName.length > 0 ? <span className='error-message'>{errors.lastName}</span> : null}
                <EditSvg/>
            </div>

            <div className="item">
                <label htmlFor="">Phone</label>
                <InternationalInput language='es' allPhoneNumbers={allPhoneNumbers} handleChange={handleChange} valueMask={phone}  />
                {errors.phone.length > 0 ? <span className='error-message'>{errors.phone}</span> : null}
                <EditSvg/>
            </div>
            
            <div className="item">
                <label htmlFor="">Email</label>
                <input type='email' name='email' onChange={handleChange} value={email}  />
                {errors.email.length > 0 ? <span className='error-message'>{errors.email}</span> : null}
                <EditSvg/>
            </div>
            <Button customClass='submit' onClick={closeModal}>Save</Button>
        </form>
    )
  }