import React, { useState } from "react";
import {observer} from "mobx-react-lite";


export default observer(function PhoneInputMask({ model }) {

    return (
        <input
            type="tel"
            value={model.currentValue}
            onChange={(e) => model.onChange(e.target.value.replace(/\D/g, ""))}
            placeholder={model.input_placeholder}
        />
    );
});


