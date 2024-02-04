import Button from "@/shared/ui/selectors/button/button";
import {useTranslation} from "@/i18n/client";
import {useState} from "react";
import Loader from "@/shared/ui/loaders/default-loader";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {useSearchParams} from "next/navigation";

export default function FormContactGuide({closeModal, i18n}) {
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
            closeModal();
            setLoading(false);

        } else {
            setError(i18n.more_than_10_characters)
        }

    }

    return (
        <form id='form_contact_guide' onSubmit={handleSubmit} style={{position: 'relative'}}>
            <h2>{i18n.contact_your_guide}</h2>
            <div className="item">
                <textarea
                    rows="5"
                    cols="20"
                    required=""
                    name="textArea"
                    placeholder={i18n.write_your_message_here_}
                    value={textArea}
                    onChange={({ target }) => setTextArea(target.value)}
                >

                </textarea>
                {!!error ? <span className='error-message'>{error}</span> : null}
            </div>
            <Button>
                {i18n.send_messages}
            </Button>
            {loading ? <Loader style={{opacity: '0.4'}}/> : null }
        </form>
    )
}
