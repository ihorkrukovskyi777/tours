'use client';
import {useState} from "react";
import './style.css';

export default function ContactUs({i18n}) {

    const [formData, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
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


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
    }

    return (
        <section className="contact_us_section">
            <div className="container">
                <h2>{i18n.contact_us}</h2>
                <div className='form_wrap'>
                    <form id='contact_form' action="" onSubmit={handleSubmit}>
                        <div className="items_form">
                            <div className="form_item">
                                <label>{i18n.name}<span className="reguired">*</span>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="John Doe"
                                        onChange={changeValueForm('name')}
                                        value={formData.name}
                                    />
                                </label>
                                {errors.name.length > 0 ?
                                    <span className='error-message'>{errors.name}</span> : null}
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
                                {errors.email.length > 0 ? <span className='error-message'>{errors.email}</span> : null}
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
                                {errors.subject.length > 0 ?
                                    <span className='error-message'>{errors.subject}</span>
                                    : null}
                            </div>

                            <div className="form_item">
                                <label>{i18n.message}<span className="reguired">*</span>
                                    <textarea
                                        name="yourmessage"
                                        cols="40"
                                        rows="10"
                                        onChange={changeValueForm('subject')}
                                        value={formData.message}
                                        placeholder={i18n.write_your_message_here}/>
                                </label>
                                {errors.message.length > 0 ?
                                    <span className='error-message'>{errors.message}</span> : null}
                            </div>

                            <div className="form_btn">
                                <button onSubmit={handleSubmit}>{i18n.send_messages}</button>
                            </div>
                        </div>

                    </form>

                </div>

            </div>
        </section>
    )
}
