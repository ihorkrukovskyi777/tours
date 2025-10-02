import {CountryData} from "@/models/input/country-data";
import {makeAutoObservable, runInAction} from "mobx";



type RawCountry = [string, string, number?, string[]?, string?];
type SelectedCountry = string;

export class InputPhoneModel {
    countries: RawCountry[];
    // @ts-ignore
    selectedCountry: SelectedCountry[];
    activeCountry: string;
    search: string;
    value: string;
    dropdownOpen: boolean;
    phone: any[]; // відфільтровані дані
    allPhones: any[]; // оригінальні дані
    locale: string
    countryFetch: string
    autoCodeComplete: boolean

    constructor(locale = 'EN' , countryFetch = 'en' , autoCodeComplete = false) {
        this.countries = CountryData;
        this.selectedCountry = ["US", "GB"];
        this.phone = [];
        this.allPhones = [];
        this.search = '';
        this.value = '';
        this.activeCountry = this.changeSlugCountry(locale)  //'GB';
        this.locale = locale;
        this.countryFetch = countryFetch;
        this.dropdownOpen = false;
        this.autoCodeComplete = autoCodeComplete;
        this.init().then();
        makeAutoObservable(this, {}, { autoBind: true });
    }

    async init() {
        await this.getCountryPhone();
    }

    async getCountryPhone() {

        let localeFetch = '';
        switch (this.countryFetch) {
            case "cat":
                localeFetch = "es";
                break;
            default:
                localeFetch = this.countryFetch;
        }
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/phone/v2/?locale=${localeFetch}`,
                { next: { revalidate: 60 * 60, tags: ["phones"] } }
            );
            const data = await res.json();
            runInAction(() => {
                this.allPhones = data.phones;
                this.phone = data.phones;
                if (this.autoCodeComplete) {
                    this.activeCountry = this.changeSlugCountry(data.countryCode);
                }

            });
        } catch (err) {
            console.log(err);
        }
    }


    changeSlugCountry(country: string) {
        let filterLocale = '';
        switch (country) {
            case "en":
                filterLocale = "gb";
                break;
            case "pt-pt":
                filterLocale = "pt";
                break;
            case "cat":
                filterLocale = "es";
                break;
            default:
                filterLocale = country;
        }
        return filterLocale.toUpperCase();
    }

    search_filter(value: string) {
        this.search = value;
        this.phone = this.allPhones.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
    }

    get select_phone() {
        return this.allPhones.find(item => item.code === this.activeCountry);
    }

    get selected_country() {
        return this.phone.filter(item =>
            this.selectedCountry.includes(item.code)
        );
    }

    get mask_active_selected() {
        return this.allPhones?.find(item => item.code === this.activeCountry)?.mask_number.replace(/\d/g, "#") ?? '';
    }

    get input_placeholder() {
        return this.allPhones?.find(item => item.code === this.activeCountry)?.mask_number;
    }

    set phone_value(value:string) {
        this.value = value;
    }

    change_country(slug: string) {
        this.activeCountry = slug;
        this.value = '';
        this.toggleDropdown();
    }

    onChange(value: string) {
        let numbers: number[] = [];
        if (this.select_phone.validation_numbers.includes(',')) {
            numbers = JSON.parse('[' + this.select_phone.validation_numbers + ']');
        } else {
            numbers = [+this.select_phone.validation_numbers];
        }
        let maxLength = Math.max(...numbers);
        if (value.length <= maxLength) {
            this.value = value;
        }

    }

    toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
    }
    closeDropdown() {
        this.dropdownOpen = false;
    }

    get validatePhone() {
        let data_validation_numbers: number[] = [];
        if (this.select_phone.validation_numbers.includes(',')) {
            data_validation_numbers = JSON.parse('[' + this.select_phone.validation_numbers + ']');
        } else {
            data_validation_numbers = [+this.select_phone.validation_numbers];
        }
        return data_validation_numbers.includes(this.value.length);
    }


    get currentValue() {
        let formatted = "";
        let digitIndex = 0;
        let mask = this.mask_active_selected;

        for (let i = 0; i < mask.length; i++) {
            if (digitIndex >= this.value.length) break;

            const maskChar = mask[i];
            if (maskChar === "#") {
                formatted += this.value[digitIndex];
                digitIndex++;
            } else {
                formatted += maskChar;
            }
        }
        return formatted;
    }

}