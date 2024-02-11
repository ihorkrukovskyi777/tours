'use client'
import EditSvg from "@/assets/images/svg/edit-svg"
import {useContext, useState, useEffect} from "react";
import Button from "@/shared/ui/selectors/button/button";
import {CheckoutStoreContext} from "@/entities/checkout/store/checkout-store";
import {observer} from "mobx-react-lite";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import {getHrefLocale} from "@/i18n/get-href-locale";
import Notification from "@/shared/ui/notification/notification";
import { validationFirstName , validationEmail , validationPhone} from "@/shared/helpers/validation-form";
import dynamic from "next/dynamic";
import recaptcha from "@/shared/util/recaptcha";
const InternationalInput = dynamic(
    () => import("@/shared/ui/selectors/international-input"),
    {ssr: false}
)
export default observer(function FormEdit({i18n}) {
    const searchParams = useSearchParams()
    const [error, setError] = useState(false);
    const {replace} = useRouter();
    const params = useParams();
    const {editDeparture, phone: {phones}, fetchCheckoutDetails, managerModal: { toggleModalEdit } } = useContext(CheckoutStoreContext);

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
        let mask = document.querySelector('#phone').getAttribute('validation-number');
        const errorLists = {
            firstName: validationFirstName(editDeparture.firstName),
            lastName: validationFirstName(editDeparture.lastName),
            email: validationEmail(editDeparture.email),
            phone: validationPhone({val:editDeparture.phone , mask:mask}),
        }

        setValidForm({...validForm , ...errorLists})
        if (!Object.values(errorLists).filter(Boolean).length) {
            submitForm().then();
        }
    }





    const submitForm = async () => {
        const token = await recaptcha("booking");
        const data = await editDeparture.updateDeparture(token);

        if(data?.isEdit === true && data.success) {
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
        phone: false,

    });

    return (
        <form id='edit_tour' onSubmit={preSubmitForValidation}>
            {error === true ? <Notification i18n={i18n} close={() => setError(false)} /> : null}
            <div className="item">
                <label htmlFor="">{i18n.first_name}</label>
                <input type='text' name='firstName' onChange={changeValue.firstName} value={editDeparture.firstName}/>
                {validForm.firstName ? <span className='error-message'>{validForm.firstName ? i18n.errors?.first_name[validForm.firstName]  : null} </span> : null}
                <EditSvg/>
            </div>
            <div className="item">
                <label htmlFor="">{i18n.last_name}</label>
                <input type='text' name='lastName' onChange={changeValue.lastName} value={editDeparture.lastName}/>
                {validForm.lastName ? <span className='error-message'>{validForm.lastName ? i18n.errors?.first_name[validForm.lastName]   : null} </span> : null}
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
                <input type='email' name='email' onChange={changeValue.email} value={editDeparture.email}/>
                {validForm.email ? <span className='error-message'> {i18n.errors[validForm.email]} </span> : null}
                <EditSvg/>
            </div>
            {Array.isArray(error) ? <ul>{error.map((value, index) => <li key={index}>{value}</li>)}</ul> : null}
            <Button customClass='submit red'>{i18n.save}</Button>
        </form>
    )
})
