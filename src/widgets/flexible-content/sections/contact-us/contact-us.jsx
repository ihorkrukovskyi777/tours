'use client';
import { useState } from 'react';

import './style.css';

export default function ContactUs({ locale, title, id }) {
   
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
     const stateAll = {
         firstName: null,
         email: null,
         yoursubject: null,
         yourmessage: null,
         errors: {
             firstName: '',
             email: '',
             yoursubject: '',
             yourmessage: '',
 
         }
     }
     const [state, setState] = useState(stateAll);
 
     function validateSwitch(name) {
         let hasNumber = /\d/;
         let errorMsg = '';
         let value = document.querySelector(`#contact_form [name=${name}]`).value;
         switch (name) {
             case 'firstName':
                 if (value.length < 1) errorMsg = 'This field is requared'
                 errors.firstName = errorMsg
                 break;
 
             case 'yoursubject':
                 if (value.length < 1) errorMsg = 'This field is requared';
                 errors.yoursubject = errorMsg
                 break;
 
             case 'email':
                 errors.email =
                     validEmailRegex.test(value)
                         ? ''
                         : 'Email is not valid!';
                 break;
             case 'yourmessage':
                if (value.length < 1) errorMsg = 'This field is requared'
                errors.yourmessage = errorMsg
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
         !loadValidate && setLoadValidate(true);
 
     }

 
     function handleSubmit(event) {
         event.preventDefault();
         if (validate === null) {
             errors.firstName = 'This field is requared';
             errors.email = 'This field is requared';
             errors.yoursubject = 'This field is requared';
             errors.yourmessage = 'This field is requared';
             document.querySelectorAll('#contact_form input , #contact_form textarea').forEach((item) => {
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
                 firstName: document.querySelector("#contact_form input[name='firstName']").value,
                 email: document.querySelector("#contact_form input[name='email']").value,
                 yoursubject: document.querySelector("#contact_form input[name='yoursubject']").value,
                 yourmessage: document.querySelector("#contact_form textarea[name='yourmessage']").value,
             }
             console.log(formData);
         } else {
             console.error('Invalid Form')
             setValidate(false);
         }
     }
 
     const {errors} = state;
 
     const [value, setValue] = useState(null);




    return (
        <section className="contact_us_section">
            <div className="container">
                <h2>Contact Us</h2>
                <div className='form_wrap'>
                    <form id='contact_form' action="" onSubmit={handleSubmit}>
                        <div className="items_form">
                            <div className="form_item">
                                <label>Name<span className="reguired">*</span>
                                    <input type="text" name="firstName" placeholder="John Doe" onChange={handleChange} />
                                </label>
                                {errors.firstName.length > 0 ? <span className='error-message'>{errors.firstName}</span> : null}
                            </div>

                            <div className="form_item">
                                <label>Email<span className="reguired">*</span>
                                    <input type="email" name="email" placeholder="johndoe@mail.com" onChange={handleChange} />
                                </label>
                                {errors.email.length > 0 ? <span className='error-message'>{errors.email}</span> : null}
                            </div>

                            <div className="form_item">
                                <label>Subject<span className="reguired">*</span>
                                    <input type="text" name="yoursubject" placeholder="Subject" onChange={handleChange}/>
                                </label>
                                {errors.yoursubject.length > 0 ? <span className='error-message'>{errors.yoursubject}</span> : null}
                            </div>

                            <div className="form_item">
                                <label>Message<span className="reguired">*</span>
                                    <textarea name="yourmessage" cols="40" rows="10" placeholder="Write your message here!"></textarea>
                                </label>
                                {errors.yourmessage.length > 0 ? <span className='error-message'>{errors.yourmessage}</span> : null}
                            </div>

                            <div className="form_btn">
                                <button onSubmit={handleSubmit}>Send Message</button>
                            </div>
                        </div>
                          
                    </form>    
                
                </div> 

            </div>   
        </section>
    )
}
