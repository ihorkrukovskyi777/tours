'use client';
import ModalTourItem from '../../modal-tour-item';
import Button from '../../button/button';
import CloseSvg from '@/assets/images/svg/close-svg';
import classNames from 'classnames';
import { useState } from 'react';
import './style.css';





export default function Step2({title , prevStep , modalOpen , size , isOpened}) {

    const [saveTour , setSaveTour] = useState(false);
    const [active, setActive] = useState(0);


    function nextStep(id) {
        setSaveTour(true);
        setActive(id)
    }
    const tabItems = [
        {
            id: 1,
            title: 'STEP 1',
          },
          {
            id: 2,
            title: 'STEP 2',
          },
          {
            id: 3,
            title: 'STEP 3',
          },
          {
            id: 4,
            title: 'STEP 4',
          },
    ];

    function saveData() {
        modalOpen();
        isOpened();
        setActive(0);
    }


    return (
        <div className={`step-2 ${size}`}>
            <div className="title">
                <div className="title_text">
                    {title}
                </div>
                <div className="close-button" onClick={modalOpen}><CloseSvg /></div>
            </div>
            <div className="choosen-date">Tomorrow, 01 December</div>
            <div className="available-tours">5 Departure(s) Available</div>

            {tabItems.map(({ id, title }) =><ModalTourItem
                key={title}
                title={title}
                nextStep={()=>nextStep(id)}
                isActive={active === id}
                />
            )}


            <div className={classNames({'disable': !saveTour})} >
                <Button customClass='gray' onClick={saveData}>Save changes</Button>
            </div>
            <Button customClass="gray" onClick={() => prevStep()}>Back</Button>
        </div>
  )
}
