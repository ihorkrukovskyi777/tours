import Button from "@/shared/ui/selectors/button/button";
import { useState } from "react";

export default function FormContactGuide({isOpenedModal , isOpenedThankYouModal}) {

    const idForm = '#form_contact_guide';
    const validateForm = errors => {
        let valid = true;
        for (let value of Object.keys(errors)) {
            if(errors[value].length > 0) {
                valid = false
                break;
            }
        }
        return valid;
    };
    const [textArea, setTextArea] = useState('');
    const stateAll = {
        textArea: textArea,
        errors: {
            textArea: '',
        }
    }
    const [state , setState] = useState(stateAll);
    function validateSwitch(name) {
        let errors = state.errors;
        let errorMsg = '';
        let value = document.querySelector(`${idForm} textarea[name=${name}]`).value;
        switch (name) {
            case 'textArea':
              setTextArea(value);
              if(value.length < 1 ) errorMsg = 'This field is requared';
              errors.textArea = errorMsg
              break;
            default:
              break;
          }
    }

    function handleChange2(event)  {
        event.preventDefault();
        const { name , value } = event.target;
        let errors = state.errors;
        validateSwitch(name);
        setState({errors, [name]: value});
    }

    function handleSubmit(event) {
        event.preventDefault();
        if(validateForm(state.errors)) {
          console.info('Valid Form');
          setTextArea('');
          isOpenedModal();
          isOpenedThankYouModal();

        }else{
          console.error('Invalid Form')
        }

    }

    return (
        <form id='form_contact_guide'  onSubmit={handleSubmit}>
            <h2>Contact Your Guide</h2>
            <div className="item">
                <textarea rows="5" cols="20" id="email_text" required="" name="textArea" placeholder="Write your message here..." onChange={handleChange2} value={textArea}></textarea>
                {state.errors.textArea.length > 0 ? <span className='error-message'>{state.errors.textArea}</span> : null}
            </div>
            <Button>Send Message</Button>
        </form>
    )
  }
