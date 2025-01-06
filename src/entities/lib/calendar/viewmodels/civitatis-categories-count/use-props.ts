import {
    useContextProcessBookingStore as useContextStore
} from "@entities/lib/calendar/process-booking.provider";
import {useLocalObservable} from "mobx-react-lite";
import {ViewModel} from "@entities/lib/calendar/viewmodels/civitatis-categories-count/view";

export function useCivitatisCategoriesProps(): ViewModel {
    const store = useContextStore();


    return useLocalObservable(() => ({
        get cat() {
            return store.formBooking.civitatisCategorySelected
        },
        get categories() {
            return this.cat?.categories ?? []
        },

        onChangePeople(val: number, cat_id: number) {
            this.cat?.onChangePeople(val, cat_id)
        },
        get maxDisabled() {
            if(!this.cat) {
                return  true;
            }

            return this.cat?.total >= this.cat?.maxPeople
        },
        get minDisableCanBookAlone() {
            const count =  this.cat?.categories.reduce((acc, cat) => {
                if(cat.canBookAlone) {
                    acc = cat.count + acc;
                }
                return acc;
            }, 0) ?? 0;

            return count < 2
        },
        get minDisabled() {
            if(!this.cat?.total) {
                return true;
            }
            return this.cat?.total < 0
        }
    }), {})

}