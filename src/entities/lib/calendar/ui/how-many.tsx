import {observer} from "mobx-react-lite";
import CounterNumbers from "@/shared/ui/selectors/counter-numbers";
import {useContextProcessBookingI18N} from "@entities/lib/calendar/process-booking.provider";
interface Props {
    people: number,
    changePeople(val: number): void
    isEmpty: boolean
}

const HowMany = observer(({ people, changePeople, isEmpty } : Props) => {
    const i18n = useContextProcessBookingI18N()
    return (
        <div className="how_many">
            {!isEmpty ?
                <>
                    <div className="block_title">
                        {i18n.how_a_many_people}
                    </div>
                    {/*// @ts-ignore*/}
                    <CounterNumbers startNumber={people} onChange={changePeople}/></>
                : null
            }
        </div>
    )
})

export default HowMany