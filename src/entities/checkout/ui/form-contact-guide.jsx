import Button from "@/shared/ui/selectors/button/button";
import {useTranslation} from "@/i18n/client";
import {useState} from "react";
import Loader from "@/shared/ui/loaders/default-loader";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {useSearchParams} from "next/navigation";

export default function FormContactGuide({isOpenedModal, isOpenedThankYouModal}) {
    const searchParams = useSearchParams()
    const code = searchParams.get('code');

    const {t} = useTranslation()
    const [textArea, setTextArea] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();


    const sendMessage = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS}/wp-json/oneport/v1/checkout/send-messages`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: textArea,
                code,
            })
        })
    }
    async function handleSubmit(event) {
        event.preventDefault();

        if (textArea?.length > 10) {
            setLoading(true);
            setError('');
            setTextArea('');

            await sendMessage();


            isOpenedModal();
            isOpenedThankYouModal();
            setLoading(false);

        } else {
            setError(t('The message must contain more than 10 characters'))
        }

    }

    return (
        <form id='form_contact_guide' onSubmit={handleSubmit} style={{position: 'relative'}}>
            <h2>{t('Contact Your Guide')}</h2>
            <div className="item">
                <textarea
                    rows="5"
                    cols="20"
                    required=""
                    name="textArea"
                    placeholder={t('Write your message here...')}
                    value={textArea}
                    onChange={({ target }) => setTextArea(target.value)}
                >

                </textarea>
                {!!error ? <span className='error-message'>{error}</span> : null}
            </div>
            <Button>
                {t('Send Message')}
            </Button>
            {loading ? <Loader style={{opacity: '0.4'}}/> : null }
        </form>
    )
}
