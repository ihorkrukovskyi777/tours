'use client';
import {useState} from "react";
import {validationNotEmpty , validationEmail , validationNotRequired} from "@/shared/helpers/validation-form";
import {fetchContactForm} from "@/shared/api/contact-form";
import ButtonLoader from "@/shared/ui/selectors/button-loader/button-loader";
import './style.css';

const initialFormState = {
    name: '',
    email: '',
    subject: '',
    message: '',
}
export default function ContactUs({i18n, idForm}) {
    const [thankYouMsg , setThankYouMsg] = useState('');
    const [statusValidation , setStatusValidation] = useState('');
    const [isLoading , setLoading] = useState(false);
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
        setThankYouMsg('')
        const errorLists = {
            name: validationNotEmpty(formData.name),
            subject: validationNotEmpty(formData.subject),
            email: validationEmail(formData.email),
            message: validationNotRequired(formData.message),
        }
        console.log(errors);

        setErrors({...errors , ...errorLists})
        //if (!Object.values(errorLists).filter(Boolean).length) {
            setLoading(true);
            const data = {
                "your-name": formData.name,
                "your-email": formData.email,
                "your-subject": formData.subject,
                "your-message": formData.message
            }
            const response = await fetchContactForm(idForm , data);
            setStatusValidation(response.status)
            setThankYouMsg(response.message)
            setLoading(false);
        //}
            if(response.status === "mail_sent") {
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
                                        placeholder={i18n.placeholder_name}
                                        onChange={changeValueForm('name')}
                                        value={formData.name}
                                    />
                                </label>
                                {formData.name.length <= 0 ?
                                    <span className='error-message'>{i18n[errors.name]}</span> : null}
                            </div>

                            <div className="form_item">
                                <label>{i18n.email}<span className="reguired">*</span>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder={i18n.placeholder_email}
                                        onChange={changeValueForm('email')}
                                        value={formData.email}
                                    />
                                </label>
                                {formData.email.length <= 0 || errors.email === 'email_error' ?
                                    <span className='error-message'>{i18n[errors.email]}</span> : null}
                            </div>

                            <div className="form_item">
                                <label>{i18n.subject}<span className="reguired">*</span>
                                    <input
                                        type="text"
                                        name="yoursubject"
                                        placeholder={i18n.placeholder_subject}
                                        onChange={changeValueForm('subject')}
                                        value={formData.subject}
                                    />
                                </label>
                                {formData.subject.length <= 0 ?
                                    <span className='error-message'>{i18n[errors.subject]}</span> : null}
                            </div>

                            <div className="form_item">
                                <label>{i18n.message}<span className="reguired">*</span>
                                    <textarea
                                        name="message"
                                        cols="40"
                                        rows="10"
                                        onChange={changeValueForm('message')}
                                        value={formData.message}
                                        placeholder={i18n.placeholder_message}/>
                                </label>
                                {formData.message.length <= 0 ?
                                    <span className='error-message'>{i18n[errors.message]}</span> : null}
                            </div>
                            <div className="button-row">
                                <ButtonLoader isSubmit={true} isLoading={isLoading}>{i18n.send_messages}</ButtonLoader>
                            </div>
                        </div>
                        {
                            statusValidation === "validation_failed" ?
                                <div className="wpcf7-response-output" aria-hidden="true">
                                    {thankYouMsg}
                                </div>
                                : null
                        }


                        {statusValidation === 'mail_sent' ? <div className='thank-you-message'>{thankYouMsg}</div> : null}


                    </form>

                </div>

            </div>
        </section>
    )
}
