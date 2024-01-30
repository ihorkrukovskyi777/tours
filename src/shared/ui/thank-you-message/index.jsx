import Button from '@/shared/ui/selectors/button/button';
import {useTranslation} from "@/i18n/client";
import './style.css';


export default function ThankYouMessage({closeModal, message}) {
    const {t} = useTranslation();

    return (
        <div className='thank-you-message'>
            <div className="wrap-text">
                <h1 id="modal-content-text">{t('Your message has been sent')}</h1>
                <div id="message-body-text" dangerouslySetInnerHTML={{__html: message}}>

                </div>
                <Button onClick={closeModal}>{t('Close')}</Button>
            </div>
        </div>
    );
}

