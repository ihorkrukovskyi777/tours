import {makeAutoObservable, runInAction} from "mobx";
import {
    DataTourSale,
    TourAdditionalModel
} from "@entities/lib/calendar/additiona-sales/models/tour-additional.model";
import {ProcessOptionModel} from "@entities/lib/calendar/models/process-option.model";
import {FormDataBooking} from "@entities/lib/calendar/models/booking-form.model";

const createOptionModel = (tour: DataTourSale, peopleNumber: number) => {
    const [locale] = tour.departure.locales;
    return new ProcessOptionModel({
        i18n: {},
        isGuide: false,
        locale: locale.code,
        title: tour.title,
        nameDayWeek: true,
        id: Number(tour.id),
        type: 'tour',
        activeLanguage: [{
            code: locale.code,
            id: locale.id,
            defaultLocale: locale.code,
        }]
    }, peopleNumber)
}

interface SelectTourCalendar {
    isOpen: boolean,
    departuresModel: null | TourAdditionalModel
}

export class AdditionalSalesModel {

    tours: TourAdditionalModel[] = []

    customer: null | FormDataBooking = null
    selectTourCalendar: SelectTourCalendar = {
        isOpen: false,
        departuresModel: null,
    }

    constructor(
        readonly option: ProcessOptionModel,
    ) {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    get isEmpty() {
        return this.tours.length === 0
    }

    setCustomer(data: FormDataBooking) {
        this.customer = data;
    }
    async setCalendarTourId(id: number) {
        const find = this.tours.find(tour => tour.data.id === id)

        if (find) {
            this.selectTourCalendar = {
                isOpen: true,
                departuresModel: find
            }

            const service = find.departuresCalendar.service;
            // @ts-ignore
            if (!service.data[find.departuresCalendar.option.locale]) {
                await this.selectTourCalendar.departuresModel?.departuresCalendar.fetchDepartures()
            }
        }

    }

    async fetchAnotherTour(booking_id: string, pageLocale: string, tour_ids: number[]) {

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/departures/additional-sales/${booking_id}?locale=${pageLocale}&ids=${tour_ids.join(',')}`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    next: {revalidate: 0}
                }
            )

            if (!response.ok) {
                throw new Error()
            }

            const data = await response.json() as DataTourSale[]

            if (!data.length) throw new Error()

            runInAction(() => {
                this.tours = data.filter(tour => !!tour.departure.locales.length)
                    .map(tour => {
                        const option = createOptionModel(tour, this.option.peopleNumber);
                        return new TourAdditionalModel({
                            ...tour,
                            id: Number(tour.id)
                        }, option)
                    })

                this.selectTourCalendar.departuresModel = this.tours[0]
            })
        } catch (err) {
            throw err
        }
    }

}