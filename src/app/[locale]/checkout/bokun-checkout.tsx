import CheckoutView from "@/bokun-widget/src/checkout/views/checkout.view";
import {observer} from "mobx-react-lite";
interface Props {
    locale: string
}
const BokunCheckout = observer(({locale}: Props) => {
    return (
        <CheckoutView locale={locale} checkout={checkout} i18n={i18n}/>
    )
})

export default BokunCheckout