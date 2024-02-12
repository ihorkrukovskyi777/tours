'use client';
import {useState} from "react";
import {validationNotEmpty , validationEmail} from "@/shared/helpers/validation-form";
import {fetchContactForm} from "@/shared/api/contact-form";
import './style.css';

const initialFormState = {
    name: '',
    email: '',
    subject: '',
    message: '',
}
export default function ContactUs({i18n, idForm}) {
    const [thankYouMsg , setThankYouMsg] = useState('');
    const [formData, setForm] = useState({
        ...initialFormState
    })

    const changeValueForm = (key) => {
        return (e) => setForm({...formData, [key]: e.target.value})
    }

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })

    async function preSubmitForValidation(e) {
        e.preventDefault();
        const errorLists = {
            name: validationNotEmpty(formData.name),
            subject: validationNotEmpty(formData.subject),
            email: validationEmail(formData.email),
            message: validationNotEmpty(formData.message),
        }

        setErrors({...errors , ...errorLists})
        if (!Object.values(errorLists).filter(Boolean).length) {
            const data = {
                "your-name": formData.name,
                "your-email": formData.email,
                "your-subject": formData.subject,
                "your-message": formData.message
            }
            const response = await fetchContactForm(idForm , data);
            console.log(response);
            setThankYouMsg(response.message)
            setForm({...initialFormState})

        }
    }

    return (
        <section className="contact_us_section">
            <div className="container">
                <h2>{i18n.contact_us}</h2>
                <div className='form_wrap'>
                    <form onSubmit={preSubmitForValidation}>
                        <div className="items_form">
                            <div className="form_item">
                                <label>{i18n.name}<span className="reguired">*</span>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="John Doe"
                                        onChange={changeValueForm('name')}
                                        value={formData.name}
                                    />
                                </label>
                                {errors.name ? <span className='error-message'>{i18n[errors.name]}</span> : null}
                            </div>

                            <div className="form_item">
                                <label>{i18n.email}<span className="reguired">*</span>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="johndoe@mail.com"
                                        onChange={changeValueForm('email')}
                                        value={formData.email}
                                    />
                                </label>
                                {errors.email ? <span className='error-message'>{i18n[errors.email]}</span> : null}
                            </div>

                            <div className="form_item">
                                <label>{i18n.subject}<span className="reguired">*</span>
                                    <input
                                        type="text"
                                        name="yoursubject"
                                        placeholder={i18n.subject}
                                        onChange={changeValueForm('subject')}
                                        value={formData.subject}
                                    />
                                </label>
                                {errors.subject ? <span className='error-message'>{i18n[errors.subject]}</span> : null}
                            </div>

                            <div className="form_item">
                                <label>{i18n.message}<span className="reguired">*</span>
                                    <textarea
                                        name="message"
                                        cols="40"
                                        rows="10"
                                        onChange={changeValueForm('message')}
                                        value={formData.message}
                                        placeholder={i18n.write_your_message_here}/>
                                </label>
                                {errors.message ? <span className='error-message'>{i18n[errors.message]}</span> : null}
                            </div>

                            <div className="form_btn">
                                <button>{i18n.send_messages}</button>
                            </div>
                        </div>
                        {thankYouMsg ? <div className='thank-you-message'>{thankYouMsg}</div> : ''}

                    </form>

                </div>

            </div>
        </section>
    )
}
