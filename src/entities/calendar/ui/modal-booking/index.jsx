import classNames from 'classnames';
import './style.css';

export default function ModalBooking({children, show, changeData , size, halfOpacity = false}) {

    const  opacity = halfOpacity ? { backgroundColor: `rgba(0,0,0,0.3)` } : {}
    return (
        <div className={classNames({'show_modal': show}, `custom_modal transition ${size}`)} style={opacity}>
            <div className={classNames('modal_content', {'change': changeData})}>
                <div className="flex-wrap">
                    {children}
                </div>
            </div>
        </div>
    );
}

