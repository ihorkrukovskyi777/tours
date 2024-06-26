import 'server-only'
import I18n from "@/i18n/service/i18n";
import { defaultNS, } from "@/i18n/settings";
import {cache} from "react";

const serverContext = cache((locale) => {
    return new I18nDefault(defaultNS, locale);
})
export default async function useDefaultI18n(locale) {
    const i18n = serverContext(locale);
    await i18n.getFetchDefault(locale);
    return {
        t: (key) => i18n.t(key, locale),
        tReplace: (key, value, locale) => i18n.tReplace(key, value, locale),
        getMapSliders: () => i18n.getMapSliders(locale),
        getCountries: () => i18n.getCountries(locale),
        getFormErrors: () => i18n.getFormErrors(locale),
        getDays: i18n.getDays,
        getMonths: i18n.getMonths,
    };
}



class I18nDefault extends I18n {
    constructor(ns, locale) {
        super(ns, locale);
    }
    getMapSliders(locale) {
        return {
            tour_features: this.t('Tour Features', locale),
            book_now: this.t('Book now', locale),
            hours: this.t('Hours', locale),
            tickets: this.t('Tickets', locale),
            from: this.t('from', locale),
            duration: this.t('Duration', locale),
            clear: this.t('Clear', locale),
            tour: this.t('Tour', locale),
            tours: this.t('Tours', locale),
            use_ctrl: this.t('Use ctrl + scroll to zoom the map', locale),
            read_more: this.t('Read More', locale),
            activities_nearby: this.t('Activities nearby', locale),
        }
    }
    getFormErrors(locale) {
        return {
            first_name_max_length_is_50_symbols: this.t('first_name_max_length_is_50_symbols', locale),
            first_name_should_be_without_numbers: this.t('first_name_should_be_without_numbers', locale),
            last_name_max_length_is_50_symbols: this.t('last_name_error', locale),
            last_name_should_be_without_numbers: this.t('last_name_should_be_without_numbers', locale),
            email_error: this.t('email_error', locale),
            phone_number_error: this.t('phone_number_error', locale),
            field_is_required: this.t('This field is required', locale),
        }
    }

    getCountries(locale) {
        const translateCountry = {};
        const country = {
            AD: "Andorra",
            AE: "United Arab Emirates",
            AF: "Afghanistan",
            AG: "Antigua and Barbuda",
            AI: "Anguilla",
            AL: "Albania",
            AM: "Armenia",
            AN: "Netherlands Antilles",
            AO: "Angola",
            AQ: "Antarctica",
            AR: "Argentina",
            AS: "American Samoa",
            AT: "Austria",
            AU: "Australia",
            AW: "Aruba",
            AZ: "Azerbaijan",
            BA: "Bosnia and Herzegovina",
            BB: "Barbados",
            BD: "Bangladesh",
            BE: "Belgium",
            BF: "Burkina Faso",
            BG: "Bulgaria",
            BH: "Bahrain",
            BI: "Burundi",
            BJ: "Benin",
            BM: "Bermuda",
            BN: "Brunei Darussalam",
            BO: "Bolivia",
            BR: "Brazil",
            BS: "Bahamas",
            BT: "Bhutan",
            BV: "Bouvet Island",
            BW: "Botswana",
            BY: "Belarus",
            BZ: "Belize",
            CA: "Canada",
            CC: "Cocos (Keeling) Islands",
            CD: "Congo, the Democratic Republic of the",
            CF: "Central African Republic",
            CG: "Congo",
            CH: "Switzerland",
            CI: "Cote D'Ivoire",
            CK: "Cook Islands",
            CL: "Chile",
            CM: "Cameroon",
            CN: "China",
            CO: "Colombia",
            CR: "Costa Rica",
            CU: "Cuba",
            CV: "Cape Verde",
            CX: "Christmas Island",
            CY: "Cyprus",
            CZ: "Czechia",
            DE: "Germany",
            DJ: "Djibouti",
            DK: "Denmark",
            DM: "Dominica",
            DO: "Dominican Republic",
            DZ: "Algeria",
            EC: "Ecuador",
            EE: "Estonia",
            EG: "Egypt",
            EH: "Western Sahara",
            ER: "Eritrea",
            ES: "Spain",
            ET: "Ethiopia",
            FI: "Finland",
            FJ: "Fiji",
            FK: "Falkland Islands (Malvinas)",
            FM: "Micronesia, Federated States of",
            FO: "Faroe Islands",
            FR: "France",
            GA: "Gabon",
            GB: "United Kingdom",
            GD: "Grenada",
            GE: "Georgia",
            GF: "French Guiana",
            GH: "Ghana",
            GI: "Gibraltar",
            GL: "Greenland",
            GM: "Gambia",
            GN: "Guinea",
            GP: "Guadeloupe",
            GQ: "Equatorial Guinea",
            GR: "Greece",
            GS: "South Georgia and the South Sandwich Islands",
            GT: "Guatemala",
            GU: "Guam",
            GW: "Guinea-Bissau",
            GY: "Guyana",
            HK: "Hong Kong",
            HM: "Heard Island and Mcdonald Islands",
            HN: "Honduras",
            HR: "Croatia",
            HT: "Haiti",
            HU: "Hungary",
            ID: "Indonesia",
            IE: "Ireland",
            IL: "Israel",
            IN: "India",
            IO: "British Indian Ocean Territory",
            IQ: "Iraq",
            IR: "Iran",
            IS: "Iceland",
            IT: "Italy",
            JM: "Jamaica",
            JO: "Jordan",
            JP: "Japan",
            KE: "Kenya",
            KG: "Kyrgyzstan",
            KH: "Cambodia",
            KI: "Kiribati",
            KM: "Comoros",
            KN: "Saint Kitts and Nevis",
            KP: "South Korea",
            KW: "Kuwait",
            KY: "Cayman Islands",
            KZ: "Kazakhstan",
            LA: "Lao People's Democratic Republic",
            LB: "Lebanon",
            LC: "Saint Lucia",
            LI: "Liechtenstein",
            LK: "Sri Lanka",
            LR: "Liberia",
            LS: "Lesotho",
            LT: "Lithuania",
            LU: "Luxembourg",
            LV: "Latvia",
            LY: "Libyan Arab Jamahiriya",
            MA: "Morocco",
            MC: "Monaco",
            MD: "Moldova, Republic of",
            MG: "Madagascar",
            MH: "Marshall Islands",
            MK: "Macedonia, Republic of the Former Yugoslav",
            ML: "Mali",
            MM: "Myanmar",
            MN: "Mongolia",
            MO: "Macao",
            MQ: "Martinique",
            MR: "Mauritania",
            MS: "Montserrat",
            MT: "Malta",
            MU: "Mauritius",
            MV: "Maldives",
            MW: "Malawi",
            MX: "Mexico",
            MY: "Malaysia",
            MZ: "Mozambique",
            NA: "Namibia",
            NC: "New Caledonia",
            NE: "Niger",
            NF: "Norfolk Island",
            NG: "Nigeria",
            NI: "Nicaragua",
            NL: "Netherlands",
            NO: "Norway",
            NP: "Nepal",
            NR: "Nauru",
            NU: "Niue",
            NZ: "New Zealand",
            OM: "Oman",
            PA: "Panama",
            PE: "Peru",
            PF: "French Polynesia",
            PG: "Papua New Guinea",
            PH: "Philippines",
            PK: "Pakistan",
            PL: "Poland",
            PM: "Saint Pierre and Miquelon",
            PN: "Pitcairn",
            PR: "Puerto Rico",
            PS: "Palestine",
            PT: "Portugal",
            PW: "Palau",
            PY: "Paraguay",
            QA: "Qatar",
            RE: "Reunion",
            RO: "Romania",
            RS: "Serbia",
            RU: "Russia",
            RW: "Rwanda",
            SA: "Saudi Arabia",
            SB: "Solomon Islands",
            SC: "Seychelles",
            SD: "Sudan",
            SE: "Sweden",
            SG: "Singapore",
            SH: "Saint Helena",
            SI: "Slovenia",
            SJ: "Svalbard and Jan Mayen",
            SK: "Slovakia",
            SL: "Sierra Leone",
            SM: "San Marino",
            SN: "Senegal",
            SO: "Somalia",
            SR: "Suriname",
            ST: "Sao Tome and Principe",
            SV: "El Salvador",
            SY: "Syrian Arab Republic",
            SZ: "Eswatini",
            TC: "Turks and Caicos Islands",
            TD: "Chad",
            TF: "French Southern Territories",
            TG: "Togo",
            TH: "Thailand",
            TJ: "Tajikistan",
            TK: "Tokelau",
            TL: "East Timor",
            TM: "Turkmenistan",
            TN: "Tunisia",
            TO: "Tonga",
            TR: "Turkey",
            TT: "Trinidad and Tobago",
            TV: "Tuvalu",
            TW: "Taiwan",
            TZ: "Tanzania, United Republic of",
            UA: "Ukraine",
            UG: "Uganda",
            UM: "United States Minor Outlying Islands",
            US: "United States",
            UY: "Uruguay",
            UZ: "Uzbekistan",
            VA: "Holy See (Vatican City State)",
            VC: "Saint Vincent and the Grenadines",
            VE: "Venezuela",
            VG: "Virgin Islands, British",
            VI: "Virgin Islands, U.S.",
            VN: "Vietnam",
            VU: "Vanuatu",
            WF: "Wallis and Futuna",
            WS: "Samoa",
            XK: "Kosovo",
            YE: "Yemen",
            YT: "Mayotte",
            ZA: "South Africa",
            ZM: "Zambia",
            ZW: "Zimbabwe",
            AX: "Aland Islands"
        }

        for (const key in country) {
            translateCountry[key] = this.t(country[key], locale)
        }
        return translateCountry
    }
}

