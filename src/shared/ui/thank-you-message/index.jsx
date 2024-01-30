import Button from '@/shared/ui/selectors/button/button';
import {useTranslation} from "@/i18n/client";
import './style.css';


export default function ThankYouMessage({closeModal}) {
    const {t} = useTranslation();

    return (
        <div className='thank-you-message'>
            <div className="wrap-text">
                <h1 id="modal-content-text">{t('Your message has been sent')}</h1>
                <div id="message-body-text">
                    <p>{t('Thank you, your guide has received your message.')}</p>
                    <p>{t('All replies will be sent to the email address which you used to complete the booking.')}</p>
                </div>
                <Button onClick={closeModal}>{t('Close')}</Button>
            </div>
        </div>
    );
}

