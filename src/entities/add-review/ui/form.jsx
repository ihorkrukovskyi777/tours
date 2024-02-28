'use client'
import {addReview} from "@/entities/api";
import {useState} from "react";
import ButtonLoader from "@/shared/ui/selectors/button-loader/button-loader";
import { useRouter } from 'next/navigation'
export default function FormReview({pageData, i18n, code}) {
    const [loading, setLoading] = useState(false);
    const [reply, setReplay] = useState('');
    const router = useRouter()
    const sendRating = async (e) => {
        e.preventDefault();
        setLoading(true);
        const isAdd = await addReview(code, reply)

        if(isAdd) {
            router.replace('/?success_review_add=yes')
        } else {
            setLoading(false);
        }
    }

    return (
        <form className="review_form" onSubmit={sendRating}>
            <h1>{pageData.thank}</h1>
            <textarea placeholder={pageData.placeHolder} name="reply" value={reply}
                      onChange={(e) => setReplay(e.target.value)}></textarea>
            <div className="sub_but">
                <ButtonLoader size="sm" isSubmit={true} isLoading={loading}>{i18n.send}</ButtonLoader>
            </div>
        </form>
    )
}