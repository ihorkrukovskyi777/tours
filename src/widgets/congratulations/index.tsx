
import Link from "next/link";
import Button from "@/shared/ui/selectors/button/button";
import {ReactNode} from "react";

import './style.css';

interface Props {
    children?: ReactNode,
    title: string,
    subTitle?: string,
    locale?: string,
    id?: number,

}

const Congratulations = ({title , subTitle , children}: Props) => {
    return (
        <section className="congratulations">
            <div className="wrapper">
                <h1>{title}</h1>
                <p className="sub_title">{subTitle}</p>
                <div className="grid gap_sm row_3">
                    {children}
                </div>
            </div>
        </section>
    )
}

export default Congratulations;