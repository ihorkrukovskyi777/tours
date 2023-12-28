import { atom } from "jotai";
import { loadable} from "jotai/utils";
import { getCountryPhone } from "@/entities/api/getCountryPhone";

export const atomPhoneLocale = atom(null, null);

export const atomPhone = loadable(atom(async (get) => {
    if(get(atomPhoneLocale) === null) {
        return null;
    }
    return getCountryPhone(get(atomPhoneLocale))
}))
