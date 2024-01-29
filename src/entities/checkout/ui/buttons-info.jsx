'use client';
import Button from "@/shared/ui/selectors/button/button"
import Link from "next/link";
import {useSearchParams, useParams} from "next/navigation";
import {getHrefLocale} from "@/i18n/get-href-locale";


export default function ButtonsInfo({isOpened , isOpenedModal}) {
    const params = useParams();
    const searchParams = useSearchParams()
    const code = searchParams.get('code');
    return (
        <div className="btn_wrap" >
            <Button onClick={isOpened}>Edit Booking</Button>
            <Button customClass="gray" onClick={isOpenedModal}>Contact Your Guide</Button>
            <Link className="button_custom gray" href={getHrefLocale(params.locale, `cancel-book?cancelCode=${code}`)}>Cancel Booking</Link>
        </div>
    )
  }

