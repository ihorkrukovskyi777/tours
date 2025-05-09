import {observer} from "mobx-react-lite";


export default observer(function PhoneInputMask({ model }) {

    return (
        <input
            id="phone_input_mask"
            type="tel"
            value={model.currentValue}
            onClick={model.closeDropdown}
            onChange={(e) => model.onChange(e.target.value.replace(/\D/g, ""))}
            placeholder={model.input_placeholder}
        />
    );
});


