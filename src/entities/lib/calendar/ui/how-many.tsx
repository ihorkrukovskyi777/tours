import {observer} from "mobx-react-lite";
import CounterNumbers from "@/shared/ui/selectors/counter-numbers";
import {useContextProcessBookingI18N} from "@entities/lib/calendar/process-booking.provider";
interface Props {
    people: number,
    changePeople(val: number): void
    isEmpty: boolean
    label?: string
    maxDisabled?: boolean
    minDisabled?: boolean
    minCount?: number
}

const HowMany = observer(({ people, changePeople, isEmpty, label, maxDisabled = false, minDisabled = false, minCount = 1} : Props) => {
    const i18n = useContextProcessBookingI18N()
    return (
        <div className="how_many">
            {!isEmpty ?
                <>
                    <div className="block_title">
                        {label ? label : i18n.how_a_many_people}
                    </div>
                    {/*// @ts-ignore*/}
                    <CounterNumbers minCount={minCount}  startNumber={people} maxDisabled={maxDisabled} minDisabled={minDisabled} onChange={changePeople}/></>
                : null
            }
        </div>
    )
})

export default HowMany