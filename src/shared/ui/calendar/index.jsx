'use client'

import {useRef, useState, useLayoutEffect, useEffect} from 'react';
import CalendarModel from '@/entities/calendar';
import DaysHeader from './days-header';
import HeaderCalendar from './header-calendar';
import Days from './days';
import './style.css';


export default function Calendar({
                                     title = "Bogota Tour Calendar",
                                     children,
                                     size = 'large',
                                     onChange,
                                     departures = {},
                                     changeDate
                                 }) {

    const CalendarJS = useRef(new CalendarModel());
    const [calendarData, setCalenndarData] = useState(null);
    useLayoutEffect(() => {
        updateCalendar();
    }, [])

    const updateCalendar = () => {
        setCalenndarData({
            ...CalendarJS.current.previusMonth(),
            ...CalendarJS.current.month,
            ...CalendarJS.current.nextMonth()
        })
    }


    useEffect(() => {
        if (calendarData) {
            changeDate(calendarData);
        }
    }, [calendarData])


    const [currentMonth, setCurrentMonth] = useState(CalendarJS.current.month);
    const [currentYear, setCurrentYear] = useState('2023');
    const [disableClass, setdisableClass] = useState(false);
    const [count, setCount] = useState(0);

    function prevMonth() {
        const prevMonth = CalendarJS.current.previusMonth();
        setCurrentMonth(CalendarJS.current.month);
        setCurrentYear(CalendarJS.current.year);
        setCount(count - 1);
        count <= 0 ? setCount(0) : null;
        count <= 1 ? setdisableClass(false) : setdisableClass(true);
        setCalenndarData(prevMonth)
    }

    function nextMonth() {
        const nextMonth = CalendarJS.current.nextMonth();
        setCurrentMonth(CalendarJS.current.month);
        setCurrentYear(CalendarJS.current.year);
        setCount(count + 1);
        count >= 0 ? setdisableClass(true) : setdisableClass(false);
        setCalenndarData(nextMonth);
    }


    const listDays = calendarData?.days?.map(day => {
        return {...day, disabled: !departures[day.fullDate]?.length}
    })
    return (
        <div className="calendar">
            <HeaderCalendar
                month={currentMonth}
                year={currentYear}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
                disableArrow={disableClass}
            />
            <DaysHeader/>
            <div id="days">
                <Days lists={listDays} onChange={onChange}/>
            </div>
            {children}
        </div>
    );
}

