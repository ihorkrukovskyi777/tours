
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
                <Link className="see-all" href={'/'}>See all paid tours</Link>
                <Button customClass={'create_account'}>Create account and save my credit</Button>
                <Button customClass={'decline_credit'}>Decline Credit</Button>
            </div>
        </section>
    )
}

export default Congratulations;