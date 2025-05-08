import {observer} from "mobx-react-lite";
import SwitcherIcons from "@/shared/ui/phone-input/ui/switcher-icons";
import {InputPhoneModel} from "@/models/input/input-phone.model";
import PhoneInputMask from "@shared/ui/phone-input/ui/input-mask";

import './style.css';


interface Props {
    model: InputPhoneModel
}


export default observer (function PhoneInput({model} : Props) {

    return (
        <div className="phone_input">
            <SwitcherIcons model={model}/>
            <div>
                <PhoneInputMask model={model} />
            </div>

        </div>
    );
})
