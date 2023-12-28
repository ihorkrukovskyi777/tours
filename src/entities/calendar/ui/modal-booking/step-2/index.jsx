import ModalTourItem from '../../../../../shared/ui/modal-tour-item';
import Button from '../../../../../shared/ui/button/button';
import CloseSvg from '@/assets/images/svg/close-svg';

import './style.css';

export default function Step2({title , nextStep , prevStep , isOpened , size}) {
    return (
        <div className={`step-2 ${size}`}>
            <div className="title">
                <div className="title_text">
                    {title}
                </div>
                <div className="close-button" onClick={() => isOpened()}><CloseSvg /></div>
            </div>
            <div className="choosen-date">Tomorrow, 01 December</div>
            <div className="available-tours">5 Departure(s) Available</div>
            <ModalTourItem nextStep={nextStep} />
            <ModalTourItem nextStep={nextStep} />
            <ModalTourItem nextStep={nextStep} />
            <Button customClass="gray" onClick={() => prevStep()}>Back</Button>
        </div>
  )
}
