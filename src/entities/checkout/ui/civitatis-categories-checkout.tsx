import {observer} from "mobx-react-lite";
import {CivitatisCheckoutModel} from "@entities/checkout/store/civitatis-categories.model";
import HowManyCheckout from "@entities/checkout/ui/how-many-checkout";

import '@/entities/lib/calendar/viewmodels/civitatis-categories-count/civitatis-categories-count.css'

interface Props {
    model: CivitatisCheckoutModel

}
const CivitatisCategoriesCheckout = observer(({model}: Props) => {
    return (
        <div className="civitatis_categories_count">
            {model.categories.map(cat => {
                return  (
                    <HowManyCheckout
                        i18n={{}}
                        maxDisabled={model.maxDisabled}
                        minDisabled={cat.canBookAlone ? model.minDisableCanBookAlone: cat.count < 1}
                        minCount={cat.canBookAlone ? 1 : 0}
                        key={cat.id}
                        people={cat.count}
                        label={cat.text}
                        changePeople={(val) => model.onChangePeople(val, cat.id)}
                        isEmpty={false}
                    />
                )
            })}

        </div>
    )
})

export default CivitatisCategoriesCheckout