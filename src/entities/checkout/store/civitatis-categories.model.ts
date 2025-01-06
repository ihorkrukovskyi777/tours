import {makeAutoObservable, runInAction, toJS} from "mobx";
import {
    CivitatisCategoriesModel, ICivitatisCategory,
    PayloadRateCivitatis
} from "@/entities/lib/calendar/models/civitatis-categories.model";
import {fetchCategories} from "@entities/lib/calendar/api/fetch-categories";

interface UseCase {
    onChangePeople(val: number): void
}

export class CivitatisCheckoutModel {
    rate: CivitatisCategoriesModel | null = null;

    isLoading = false;
    cacheOldSelect: ICivitatisCategory[] = []

    constructor(readonly rate_booked: PayloadRateCivitatis | undefined, readonly useCase: UseCase) {
        makeAutoObservable(this, {cacheOldSelect: false}, {autoBind: true})
    }

    async fetchEditCivitatisCategories(id: number, locale: string, number_people: number, max_number_people: number) {
        this.isLoading = true
        const rates = await fetchCategories(id, locale);
        const findRate = rates.find(rate => Number(this.rate_booked?.id) === Number(rate.rate_id))

        if (findRate) {
            this.rate = new CivitatisCategoriesModel(findRate.rate_id, findRate.text, findRate.categories, number_people, max_number_people);
            runInAction(() => {
                this.rate_booked?.categories.forEach(item => {
                    this.rate?.onChangePeople(Number(item.quantity), Number(item.id))
                })

            })
        }
        this.isLoading = false;
    }

    reset() {
        this.rate = null
    }

    async fetchNewCategories(id: number, locale: string, number_people: number, max_number_people: number) {
        this.cacheOldSelect = this.rate?.categories ? toJS(this.rate?.categories) : [];

        this.isLoading = true
        const rates = await fetchCategories(id, locale)

        runInAction(() => {
            const rate = rates[0]
            this.rate = new CivitatisCategoriesModel(rate.rate_id, rate.text, rate.categories, number_people, max_number_people);

            this.rate.setDistributeByCategories(number_people, this.cacheOldSelect)
;
            this.isLoading = false
        })
    }


    get categories() {
        return this.rate?.categories ?? []
    }

    get maxDisabled() {
        if (!this.rate) {
            return true;
        }

        return this.rate?.total >= this.rate?.maxPeople
    }

    get minDisableCanBookAlone() {
        const count = this.rate?.categories.reduce((acc, cat) => {
            if (cat.canBookAlone) {
                acc = cat.count + acc;
            }
            return acc;
        }, 0) ?? 0;

        return count < 2
    }

    onChangePeople(val: number, cat_id: number) {
        this.rate?.onChangePeople(val, cat_id)
        if (this.rate?.total) {
            this.useCase.onChangePeople(this.rate?.total)
        }
    }

    get minDisabled() {
        if (!this.rate?.total) {
            return true;
        }
        return this.rate?.total < 0
    }
}