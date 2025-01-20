'use client';
import Title from "@shared/ui/paragraphs/title/title";
import CongratulationCard from "@shared/ui/card-components/congratulation-card/congratulation-card";
import {getPageBySlug} from "@entities/system-distribution/api";
// @ts-ignore
const PaidPage = async ({ params }) => {

    const page = await getPageBySlug(process.env.NEXT_PUBLIC_SYSTEM_HOSTING , 'paid-tour-in-london' , 'en');
    console.log(page , 'page');

    return (
        <div className="container padding_xs">
            <div className="content">
                <Title>Paid Tours in London</Title>
                <div className="grid gap_sm row_3">
                    <CongratulationCard title={'Congratulations!'} url={''}/>
                    <CongratulationCard title={'Congratulations!'} url={''}/>
                    <CongratulationCard title={'Congratulations!'} url={''}/>
                </div>
            </div>
        </div>
    )
}

export default PaidPage