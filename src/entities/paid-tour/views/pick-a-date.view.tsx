'use client'
import Button from "@shared/ui/selectors/button/button";
import ButtonIcon from '@/assets/images/svg/paid/calendar.svg';

import {useTranslations} from "next-intl";
import './styles/pick-a-date.scss';


export type Upcoming =
    {
        date: {
            fullDate: string,
            dayWeek: string,
            dayNumber: string | number,
            month: string,
            time: string | null
        },
        id: string
    }


interface Props {
    price: number | null,
    upcoming: Upcoming[],
    perLabel: string | null
    disabled?: boolean
    onPickDate(fullDate: string): void
    onPick(): void
}

const PickADate = ({price, upcoming, onPick, perLabel, disabled = false, onPickDate}: Props) => {
    const tDay = useTranslations('daysFull')
    const tMonth = useTranslations('months')
    const t = useTranslations('')
    return (
        <div className="pick-a-date">
            <div className="pick-a-date__price">
                <span>{price ? price : '~'} USD</span>
                <span>{perLabel}</span>
            </div>
            <Button
                disabled={disabled}
                onClick={onPick}
                icon={ButtonIcon}
                customClass={'button_default'}
            >
                {t('pickADate')}
            </Button>

            <div className="pick-a-date__upcoming">
                <p>{t('upcoming')}</p>
                <div className="pick-a-date__upcoming__items">
                    {upcoming.map(dep => {
                        return (
                            <div className="item" key={dep.id} onClick={() => onPickDate(dep.date.fullDate)}>
                                <span>{tDay(dep.date.dayWeek)} {dep.date.dayNumber} {tMonth(dep.date.month)}</span>
                                {dep.date.time ? <span>{dep.date.time}</span> : null}
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default PickADate;