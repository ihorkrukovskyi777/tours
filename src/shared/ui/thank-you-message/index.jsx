import Button from '@/shared/ui/selectors/button/button';
import './style.css';



export default function ThankYouMessage({isOpenedThankYouModal}) {

return (
    <div className='thank-you-message'>
        <div className="wrap-text">
            <h1 id="modal-content-text">Your message has been sent</h1>
            <div id="message-body-text">
                <p>Thank you, your guide has received your message.</p>
                <p>All replies will be sent to the email address which you used to complete the booking.</p>
            </div>
            <Button onClick={isOpenedThankYouModal}>Close</Button>
        </div>
    </div>
  );
}

