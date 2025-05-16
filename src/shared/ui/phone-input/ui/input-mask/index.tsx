import {observer} from "mobx-react-lite";
import {InputPhoneModel} from "@/models/input/input-phone.model";
import {toJS} from "mobx";

interface Props {
    model: InputPhoneModel,
}

export default observer(function PhoneInputMask({model}: Props) {

    const data = toJS(model.select_phone);
    return (

        <input
            id="phone_input_mask"
            type="tel"
            value={model.currentValue}
            onClick={model.closeDropdown}
            onChange={(e) => model.onChange(e.target.value.replace(/\D/g, ""))}
            placeholder={model.input_placeholder}
            /*name="phone"*/
            required
            data-validation-number={data?.validation_numbers}

        />
    );
});


