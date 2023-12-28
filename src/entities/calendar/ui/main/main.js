'use client';
import {useEffect, useLayoutEffect} from "react";
import {useAtom, useSetAtom, useAtomValue} from "jotai";
import {useHydrateAtoms} from 'jotai/utils'
import Faqs from "@/widgets/faqs/faqs";
import Loader from "@/shared/ui/loaders/default-loader";
import OpenModalButton from "@/entities/calendar/ui/open-modal-button";
import DeparturesList from "@/entities/calendar/ui/departures-list";
import TabsLanguages from "@/shared/ui/tabs-languages";
import ModalBooking from "@/entities/calendar/ui/modal-booking";
import Step3 from '@/entities/calendar/ui/modal-booking/step-3/index'
import CounterNumbers from "@/shared/ui/counter-numbers";
import TourLogic from "@/entities/calendar/service/tour-logic";
//atoms
import {
    atomDepLocale,
    atomInitService,
    atomLoading,
    atomPeople,
    atomChangePeople, atomChangeLanguage, atomService, atomAllDepartures, atomSetSelected,
} from "@/entities/calendar/atom/departures"
import { atomModalBooking } from "@/entities/calendar/atom/modal";
import {atomPhone, atomPhoneLocale} from "@/entities/calendar/atom/phones";


import './style.css';

export default function Main({locale, type, id}) {

    useHydrateAtoms([[atomDepLocale, locale], [atomService, new TourLogic(id, locale, locale, type)]])

    const loading = useAtomValue(atomLoading)
    const people = useAtomValue(atomPeople)
    const phones = useAtomValue(atomPhone);
    const depLocale = useAtomValue(atomDepLocale)
    const allDepartures = useAtomValue(atomAllDepartures)

    const initService = useSetAtom(atomInitService);
    const updatePeople = useSetAtom(atomChangePeople)
    const changeLanguage = useSetAtom(atomChangeLanguage)


    const [_, setPhoneLocale] = useAtom(atomPhoneLocale);
    const [isOpenBookingModal, setOpenModalBooking] = useAtom(atomModalBooking);

    useLayoutEffect(() => {
        initService().then();
    }, [])

    useEffect(() => {
        setPhoneLocale(locale);
    }, [locale])

    console.log(phones, 'phones')

    return (
        <section id="tour_calendar_section" className="tour_calendar">
            <div className="container">
                <div className="wrapper">
                    <div className="calendar_wrap">
                        <h2 className="title">Tour Calendar</h2>
                        <div className="wrap-box">
                            <div className="wrap-button">
                                {phones.state === 'loading' ? <Loader/> : <OpenModalButton/>}
                            </div>
                            <TabsLanguages selectedCode={depLocale} loading={loading} onChange={changeLanguage}/>
                            <div className="how_many">
                                {allDepartures.length ?
                                    <>
                                        <div className="block_title">
                                            How many people are coming?
                                        </div>
                                        <CounterNumbers startNumber={people} onChange={updatePeople}/></>
                                    : null
                                }
                            </div>
                            <DeparturesList/>
                        </div>
                    </div>
                    <Faqs/>
                </div>
            </div>
            <ModalBooking show={isOpenBookingModal}>
                {phones.state === 'loading' ? null : <Step3 allPhoneNumbers={phones.data} language={locale} close={() => setOpenModalBooking(false)}/>}
            </ModalBooking>
        </section>
    )
}
