'use client'
import {observer} from "mobx-react-lite";
import {useEffect, useRef, useState} from "react";
import {Modal} from 'react-responsive-modal';
import ModalOnlyCheckout from "@/bokun-widget/src/views/modal-only-checkout";
import BokunChoiceAnOrderView from "@/bokun-widget/src/bokun-choice-an-order.view";
import {BokunChoiceAnOrderModel, Loader} from "@/bokun-widget/src/bokun-choice-an-order.model";
import {useSearchParams} from "next/navigation";
import {ReferralTraffic} from "@/bokun-widget/src/entity/users-traffic-store";
import {Ii18n} from "@/bokun-widget/src/common/i18n.type";
import 'react-responsive-modal/styles.css';

interface Props {
    i18n: Ii18n
    bokun_id: number
    locale: string
}

const BokunPagePaid = observer(({locale, i18n, bokun_id}: Props) => {

    const [isOpen, setOpen] = useState(false)
    const search = useSearchParams()
    const model = useRef<BokunChoiceAnOrderModel>(new BokunChoiceAnOrderModel(
        bokun_id,
        locale,
        new Loader(),
        {
            referral_site: process.env.NEXT_PUBLIC_CANONICAL_DOMAIN as string,
            locale: locale,
            review: new ReferralTraffic()
        }))
    const booking_hash = search.get('booking_hash')

    useEffect(() => {
        model.current.init()
    }, [])

    return (
        <div className="booking_view">
            <button onClick={() => setOpen(v => !v)}>Open Modal</button>
            {booking_hash && <ModalOnlyCheckout i18n={i18n} locale={locale} booking_hash={booking_hash}/>}
            <Modal
                classNames={{
                    modal: `booking_view__modal`,
                }}
                open={isOpen}
                onClose={() => setOpen(v => !v)}
                center
            >
                <BokunChoiceAnOrderView
                    model={model.current}
                    i18n={i18n}
                >
                    <div>logo</div>
                </BokunChoiceAnOrderView>
            </Modal>
        </div>
    )
})

export default BokunPagePaid