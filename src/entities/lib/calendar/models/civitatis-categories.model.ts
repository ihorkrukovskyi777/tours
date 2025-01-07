import {makeAutoObservable} from "mobx";
import {CivitatisCategory} from "@entities/lib/calendar/@types";

export interface ICivitatisCategory extends CivitatisCategory {
    count: number
}

export interface PayloadRateCivitatis {
    id: number,
    categories: { id: number, quantity: number }[]
}

export class CivitatisCategoriesModel {
    categories: ICivitatisCategory[] = [];
    readonly maxPeople: number
    readonly rate_id: number;
    readonly title: string

    constructor(rate_id: number, title: string, categories: CivitatisCategory[], peopleNumber: number, maxPeopleNumber: number) {
        this.rate_id = rate_id;
        this.title = title;
        this.maxPeople = maxPeopleNumber;
        this.categories = categories.map(cat => ({
            ...cat,
            count: 0
        }))
        this.initPeople(peopleNumber);
        makeAutoObservable(this, {}, {autoBind: true})
    }

    get notEmptyCategories() {
        return this.categories.filter(cat => cat.count > 0)
    }

    private initPeople(peopleNumber: number) {
        const find = this.categories.find(cat => cat.canBookAlone)

        if (find) {
            find.count = peopleNumber;
        }
    }

    get dataRate(): PayloadRateCivitatis {
        return {
            id: this.rate_id,
            categories: this.categories.filter(item => item.count > 0).map(cat => ({
                id: cat.id,
                quantity: cat.count
            }))
        }
    }

    setCatCanBookAlone(val: number) {
        const find = this.categories.find(cat => cat.canBookAlone)

        if (find) {
            this.onChangePeople(val, find.id)
        }
    }

    private resetCatCount() {
        this.categories.forEach(cat => {
            cat.count = 0;
        })
    }
    setDistributeByCategories(peopleNumber: number, oldCategories: ICivitatisCategory[]) {
        const isMatchCategories = !oldCategories.some(cat =>
            !this.categories.find(item => item.text.toLowerCase().trim() === cat.text.toLowerCase().trim() && cat.canBookAlone === item.canBookAlone)
        )


        if (isMatchCategories) {
            this.resetCatCount();

            let count = peopleNumber;

            const categories = [...this.categories].sort((a, b) => Number(b.canBookAlone) - Number(a.canBookAlone))

            categories.forEach(cat => {
                const find = oldCategories.find(item => item.text.toLowerCase() === cat.text.toLowerCase())

                if (find && count > 0) {
                    let people = find.count

                    if (count - find.count < 0) {
                        people = count;
                    }
                    count = count - find.count

                    this.onChangePeople(people, cat.id)
                }
            })

            const cat = this.categories.find(cat => cat.canBookAlone)
            if (count > 0 && cat) {
                cat.count = cat.count + count
            }
        }

    }

    get peopleNumber() {
        return this.dataRate.categories.reduce((acc, cat) => cat.quantity + acc, 0)
    }

    onChangePeople(val: number, cat_id: number) {
        const find = this.categories.find(cat => cat.id === cat_id);

        if (find) {
            find.count = val
        }
    }

    get total() {
        return this.categories.reduce((acc, cat) => {
            acc = cat.count + acc;
            return acc
        }, 0)
    }

}