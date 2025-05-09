import {CountryData} from "@/models/input/country-data";
import {CountryTranslations} from "@/models/input/country-translation";
import {makeAutoObservable, runInAction} from "mobx";

type RawCountry = [string, string, number?, string[]?, string?];
type SelectedCountry = string;

export class InputPhoneModel {
    countries: RawCountry[];
    // @ts-ignore
    countriesTranslate: CountryTranslations[];
    selectedCountry: SelectedCountry[];
    activeCountry: string;
    search: string;
    value: string;
    dropdownOpen: boolean;
    validation: boolean;
    phone: any[]; // відфільтровані дані
    allPhones: any[]; // оригінальні дані

    constructor() {
        this.countries = CountryData;
        this.countriesTranslate = CountryTranslations;
        this.activeCountry = 'US';
        this.selectedCountry = ["US", "GB"];
        this.phone = [];
        this.allPhones = [];
        this.search = '';
        this.value = '';
        this.validation = false;
        this.dropdownOpen = false;
        this.init().then(data => console.log(data));
        makeAutoObservable(this, {}, { autoBind: true });

    }

    async init() {
        await this.getCountryPhone();
    }

    async getCountryPhone(locale = "en") {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/phone?locale=${locale}`,
                { next: { revalidate: 60 * 60, tags: ["phones"] } }
            );
            const data = await res.json();
            runInAction(() => {
                this.allPhones = data;
                this.phone = data;
            });
        } catch (err) {
            console.log(err);
        }
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
            this.validatePhone();
        }
    }

    toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
    }
    closeDropdown() {
        this.dropdownOpen = false;
    }

    validatePhone() {
        let data_validation_numbers: number[] = [];
        if (this.select_phone.validation_numbers.includes(',')) {
            data_validation_numbers = JSON.parse('[' + this.select_phone.validation_numbers + ']');
        } else {
            data_validation_numbers = [+this.select_phone.validation_numbers];
        }

        this.validation = data_validation_numbers.includes(this.value.length);

        console.log(this.validation , 'this.validation');

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