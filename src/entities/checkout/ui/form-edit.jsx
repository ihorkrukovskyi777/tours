'use client'
import EditSvg from "@/assets/images/svg/edit-svg"
import {useContext, useState, useEffect} from "react";
import Button from "@/shared/ui/selectors/button/button";
import InternationalInput from "@/shared/ui/selectors/international-input";
import {useTranslation} from "@/i18n/client";
import {CheckoutStoreContext} from "@/entities/checkout/store/checkout-store";
import {observer} from "mobx-react-lite";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import {getHrefLocale} from "@/i18n/get-href-locale";
import Notification from "@/shared/ui/notification/notification";
import {valid , validationFirstName , validationEmail , validationPhone} from "@/shared/helpers/validation-form";


export default observer(function FormEdit({i18n}) {

    const searchParams = useSearchParams()
    const [error, setError] = useState(false);
    const {replace} = useRouter();
    const params = useParams();
    const {editDeparture, phone: {phones}, fetchCheckoutDetails, managerModal: { toggleModalEdit } } = useContext(CheckoutStoreContext);
    const {t} = useTranslation()

    useEffect(() => {
        setError(false);
    }, [])


    const changeValue = {
        firstName: ({target}) => editDeparture.setFirstName(target.value),
        lastName: ({target}) => editDeparture.setLastName(target.value),
        email: ({target}) => editDeparture.setEmail(target.value),
        phone: ({target}) => editDeparture.setPhone(target.value),
    }





    function preSubmitForValidation(e) {
        e.preventDefault();
        const errorLists = {
            firstName: validationFirstName(editDeparture.firstName),
            lastName: validationFirstName(editDeparture.lastName),
            email: validationEmail(editDeparture.email),
            phone: validationPhone(editDeparture.phone),
        }

        setValidForm({...validForm , ...errorLists})
        if (!Object.values(errorLists).filter(Boolean).length) {
            submitForm();
        }
    }



    const submitForm = async () => {
        const data = await editDeparture.updateDeparture();
        if(data.isEdit === true && data.success) {
            await fetchCheckoutDetails(searchParams.get('code'));
            toggleModalEdit();
        }
        else if(data.success === false) {
            setError(data.errors ?? true);
        } else {
           replace(getHrefLocale(params.locale, `checkout?code=${data.booking_id}`))
        }
    }

    const [validForm , setValidForm] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phone: false

    });

    console.log(validForm);


    return (
        <form id='edit_tour' onSubmit={preSubmitForValidation}>
            {error === true ? <Notification close={() => setError(false)} /> : null}
            <div className="item">
                <label htmlFor="">{i18n.first_name}</label>
                <input type='text' name='firstName' onChange={changeValue.firstName} value={editDeparture.firstName}/>
                {validForm.firstName ? <span className='error-message'>{validForm.firstName ? `First Name ${t(validForm.firstName)}`  : null} </span> : null}
                <EditSvg/>
            </div>
            <div className="item">
                <label htmlFor="">{i18n.last_name}</label>
                <input type='text' name='lastName' onChange={changeValue.lastName} value={editDeparture.lastName}/>
                {validForm.lastName ? <span className='error-message'>{validForm.lastName ? `Last Name ${t(validForm.lastName)}`  : null} </span> : null}
                <EditSvg/>
            </div>

            <div className="item">
                <label htmlFor="">{i18n.phone}</label>
                {phones.state === 'fulfilled' ?
                    <InternationalInput
                        locale={editDeparture.countrySlug}
                        allPhoneNumbers={phones.value}
                        handleChange={(e) => editDeparture.setPhone(e.target.value)}
                        phoneDefault={editDeparture.phoneNumber}
                        changeCountryCode={editDeparture.changeCountryCode}
                    />
                    : null}
                {validForm.phone ? <span className='error-message'> {t(validForm.phone)} </span> : null}
                <EditSvg/>
                {validForm.phone ? <span className='error-message'> {t(validForm.phone)} </span> : null}
            </div>

            <div className="item">
                <label htmlFor="">{i18n.email}</label>
                <input type='email' name='email' onChange={changeValue.email} value={editDeparture.email}/>
                {validForm.email ? <span className='error-message'> {t(validForm.email)} </span> : null}
                <EditSvg/>
            </div>
            {Array.isArray(error) ? <ul>{error.map((value, index) => <li key={index}>{value}</li>)}</ul> : null}
            <Button customClass='submit red'>{i18n.save}</Button>
        </form>
    )
})
