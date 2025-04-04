'use client'
import EditSvg from "@/assets/images/svg/edit-svg"
import {useContext, useState, useEffect, useRef} from "react";
import Button from "@/shared/ui/selectors/button/button";
import {CheckoutStoreContext} from "@/entities/checkout/store/checkout-store";
import {observer} from "mobx-react-lite";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import {getHrefLocale} from "@/i18n/get-href-locale";
import Notification from "@/shared/ui/notification/notification";
import {validationFirstName, validationEmail, validationPhone} from "@/shared/helpers/validation-form";
import dynamic from "next/dynamic";

const InternationalInput = dynamic(
    () => import("@/shared/ui/selectors/international-input"),
    {ssr: false}
)


const initialStateFormError = {
    firstName: false,
    lastName: false,
    email: false,
    phone: false,

}
export default observer(function FormEdit({i18n}) {
    const searchParams = useSearchParams()
    const [error, setError] = useState(false);
    const [submitEventForm, setSubmitEventForm] = useState(false);
    const {replace} = useRouter();
    const params = useParams();
    const {
        editDeparture,
        phone: {phones},
        fetchCheckoutDetails,
        managerModal: {toggleModalEdit}
    } = useContext(CheckoutStoreContext);

    useEffect(() => {
        setError(false);
    }, [])

    const refForm = useRef(null);


    const changeValue = {
        firstName: ({target}) => editDeparture.setFirstName(target.value),
        lastName: ({target}) => editDeparture.setLastName(target.value),
        email: ({target}) => editDeparture.setEmail(target.value),
        phone: ({target}) => editDeparture.setPhone(target.value),
    }

    function preSubmitForValidation(e) {
        e.preventDefault();
        if (submitEventForm) {
            return;
        }
        let mask = document.querySelector('#phone').getAttribute('validation-number');
        const errorLists = {
            firstName: validationFirstName(editDeparture.firstName),
            lastName: validationFirstName(editDeparture.lastName),
            email: validationEmail(editDeparture.email),
            phone: validationPhone({val: editDeparture.phone, mask: mask}),
        }

        setValidForm({...validForm, ...errorLists})
        if (!Object.values(errorLists).filter(Boolean).length) {
            setSubmitEventForm(true)
            submitForm().then(() => {
                setSubmitEventForm(false)
            });
        }
    }

    const submitForm = async () => {
        const token = '';
        const data = await editDeparture.updateDeparture(token);

        if ((data?.isEdit === true && data.success) || data?.isCancel) {
            await fetchCheckoutDetails(searchParams.get('code'));
            toggleModalEdit();
        } else if (data.success === false) {
            setError(data.errors ?? true);
        } else {
            toggleModalEdit();
            replace(getHrefLocale(params.locale, `checkout?code=${data.booking_id}`))
        }
    }

    const [validForm, setValidForm] = useState({...initialStateFormError});

    return (
        <form id='edit_tour' onSubmit={preSubmitForValidation} ref={refForm}>
            {error === true ? <Notification i18n={i18n} close={() => setError(false)}/> : null}
            <div className="item">
                <label htmlFor="">{i18n.first_name}</label>
                <input
                    required
                    type='text'
                    name='firstName'
                    onChange={changeValue.firstName}
                    value={editDeparture.firstName}
                />
                {validForm.firstName ?
                    <span className='error-message'>
                        {validForm.firstName ? i18n.errors?.first_name[validForm.firstName] : null}
                    </span>
                    : null
                }
                <EditSvg/>
            </div>
            <div className="item">
                <label htmlFor="">{i18n.last_name}</label>
                <input
                    required
                    type='text'
                    name='lastName'
                    onChange={changeValue.lastName}
                    value={editDeparture.lastName}
                />
                {validForm.lastName ?
                    <span className='error-message'>
                        {validForm.lastName ? i18n.errors?.first_name[validForm.lastName] : null}
                    </span>
                    : null
                }
                <EditSvg/>
            </div>

            <div className="item">
                <label htmlFor="">{i18n.phone}</label>
                {phones.state === 'fulfilled' ?
                    <InternationalInput
                        locale={editDeparture.countrySlug}
                        allPhoneNumbers={phones.value}
                        handleChange={(e) => editDeparture.setPhone(e.target.value)}
                        phoneDefault={editDeparture.phoneNumber ?? ''}
                        changeCountryCode={editDeparture.changeCountryCode}
                    />
                    : null}
                <EditSvg/>
                {validForm.phone ? <span className='error-message'> {i18n.errors[validForm.phone] ?? ''} </span> : null}
            </div>

            <div className="item">
                <label htmlFor="">{i18n.email}</label>
                <input
                    required
                    type='email'
                    name='email'
                    onChange={changeValue.email}
                    value={editDeparture.email}
                />
                {validForm.email ?
                    <span className='error-message'> {i18n.errors[validForm.email]} </span>
                    : null
                }
                <EditSvg/>
            </div>
            {Array.isArray(error) ?
                <ul>{error.map((value, index) => {
                    return <li style={{margin: '10px 0', color: 'red'}} key={index} dangerouslySetInnerHTML={{__html: value}}></li>
                })}</ul>
                : null}
            <Button customClass='submit red' onClick={(e) => {
                if(refForm.current.checkValidity() === false) {
                    setValidForm({ ...initialStateFormError })

                }
            }}>{i18n.save}</Button>
        </form>
    )
})
