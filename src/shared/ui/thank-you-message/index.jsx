import Button from '@/shared/ui/selectors/button/button';
import './style.css';


export default function ThankYouMessage({closeModal, i18n, message}) {

    return (
        <div className='thank-you-message'>
            <div className="wrap-text">
                <h1 id="modal-content-text">{i18n.your_message_has_been_sent}</h1>
                <div id="message-body-text" dangerouslySetInnerHTML={{__html: message}}>

                </div>
                <Button onClick={closeModal}>{i18n.close}</Button>
            </div>
        </div>
    );
}

