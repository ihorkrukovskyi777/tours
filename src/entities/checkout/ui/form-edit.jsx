'use client'
import EditSvg from "@/assets/images/svg/edit-svg"
import {useContext} from "react";
import Button from "@/shared/ui/selectors/button/button";
import InternationalInput from "@/shared/ui/selectors/international-input";
import {useTranslation} from "@/i18n/client";
import {CheckoutStoreContext} from "@/entities/checkout/store/checkout-store";
import {observer} from "mobx-react-lite";


export default observer(function FormEdit({ close }) {
    const {editDeparture, phone: { phones }} = useContext(CheckoutStoreContext);

    const { t } = useTranslation()

    const changeValue = {
        firstName: ({ target }) => editDeparture.setFirstName(target.value),
        lastName: ({ target }) => editDeparture.setLastName(target.value),
        email: ({ target }) => editDeparture.setEmail(target.value),
    }
    return (
        <form id='edit_tour' onSubmit={() => {}}>
            <div className="item">
                <label htmlFor="">First Name</label>
                <input type='text' name='firstName' onChange={changeValue.firstName}  value={editDeparture.firstName}/>
                {/*{errors.firstName.length > 0 ? <span className='error-message'>{errors.firstName}</span> : null}*/}
                <EditSvg/>
            </div>
            <div className="item">
                <label htmlFor="">Last Name</label>
                <input type='text' name='lastName' onChange={changeValue.lastName} value={editDeparture.lastName}/>
                {/*{errors.lastName.length > 0 ? <span className='error-message'>{errors.lastName}</span> : null}*/}
                <EditSvg/>
            </div>

            <div className="item">
                <label htmlFor="">{t('Phone')}</label>
                {phones.state === 'fulfilled'  ?
                    <InternationalInput
                        locale={editDeparture.countrySlug}
                        allPhoneNumbers={phones.value}
                        handleChange={(e) => editDeparture.setPhone(e.target.value)}
                        phoneDefault={editDeparture.phoneNumber}
                        changeCountryCode={editDeparture.changeCountryCode}
                    />
                    : null }
                {/*{errors.phone.length > 0 ? <span className='error-message'>{errors.phone}</span> : null}*/}
                <EditSvg/>
            </div>

            <div className="item">
                <label htmlFor="">Email</label>
                <input type='email' name='email' onChange={changeValue.email}  value={editDeparture.email}/>
                {/*{errors.email.length > 0 ? <span className='error-message'>{errors.email}</span> : null}*/}
                <EditSvg/>
            </div>
            <Button customClass='submit' onClick={close}>{t('Save')}</Button>
        </form>
    )
})
