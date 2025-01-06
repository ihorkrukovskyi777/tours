import {observer} from "mobx-react-lite";
import {
    ICivitatisCategory,
} from "@entities/lib/calendar/models/civitatis-categories.model";
import {useCivitatisCategoriesProps} from "@entities/lib/calendar/viewmodels/civitatis-categories-count/use-props";
import HowMany from "@entities/lib/calendar/ui/how-many";
import './civitatis-categories-count.css'
export interface ViewModel {
    categories: ICivitatisCategory[]
    onChangePeople(val: number, cat_id: number): void
    maxDisabled: boolean
    minDisabled: boolean
    minDisableCanBookAlone: boolean
}

const View = observer(() => {
    const props = useCivitatisCategoriesProps();
    return (
        <div className="civitatis_categories_count">
            {props.categories.map(cat => {
                return  (
                    <HowMany
                        maxDisabled={props.maxDisabled}
                        minDisabled={cat.canBookAlone ? props.minDisableCanBookAlone: cat.count < 1}
                        minCount={cat.canBookAlone ? 1 : 0}
                        key={cat.id}
                        people={cat.count}
                        label={cat.text}
                        changePeople={(val) => props.onChangePeople(val, cat.id)}
                        isEmpty={false}
                    />
                )
            })}

        </div>
    )
})

export default View