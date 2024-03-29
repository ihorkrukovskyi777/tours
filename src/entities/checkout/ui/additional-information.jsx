'use client'
import {useEffect, useState} from "react";
import {useParams, useSearchParams} from "next/navigation";
import {additionalInformation} from "@/entities/checkout/api";

export default function AdditionalInformation({ i18n }) {
    const [message, setMessage] = useState('')
    const query = useSearchParams();
    const params = useParams();

    const code = query.get('code');
    useEffect(() => {
        additionalInformation(code, params.locale).then(data => {
            setMessage(data?.message)
        })
    }, [code, params.locale])

    if(!message?.trim()) {
        return null;
    }
    return (
        <div className="additional-information">
            <h3>{i18n.additional_information}<span className="dot">:</span></h3>
            <p>{message}</p>
        </div>
    );
}
