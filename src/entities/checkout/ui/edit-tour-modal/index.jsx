import classNames from 'classnames';
import {useContext, useRef} from "react";
import Button from "@/shared/ui/selectors/button/button";
import FormEdit from "@/entities/checkout/ui/form-edit";
import {CheckoutStoreContext} from "@/entities/checkout/store/checkout-store";
import {observer} from "mobx-react-lite";
import DefaultModal from "@/shared/ui/modals/default-modal";
import ChooseDate from "@/entities/checkout/ui/calendar/choose-date";
import {HelperDateHtml} from "@/shared/helpers/helperDateHtml";
import CivitatisCategoriesCheckout from "@/entities/checkout/ui/civitatis-categories-checkout";
import Loader from "@/shared/ui/loaders/default-loader";
import './style.css';

export default observer(function EditModalTour({i18n}) {
    const {
        editDeparture,
        managerModal: {modalEdit, toggleModalEdit, chooseDateModal, toggleModalChoose},
    } = useContext(CheckoutStoreContext);
    const helper = new HelperDateHtml(editDeparture.activityDate)

    const bgRef = useRef(null)

    const opacityValue = chooseDateModal && editDeparture.openModalDepartureList ? 0 : 0.3;
    const opacity = chooseDateModal ? {backgroundColor: `rgba(0, 0, 0,${opacityValue})`} : {}
    return (
        <div
            ref={bgRef}
            onClick={(e) => {
                if(e.target === bgRef.current) {
                    toggleModalEdit();
                }
            }}
            style={opacity}
            className={classNames({'show_modal': modalEdit}, 'edit_tour_modal transition')}
        >
            <div className="modal_content">

                <DefaultModal halfOpacity={modalEdit} modalShow={chooseDateModal} isOpenedModal={toggleModalChoose}  size={'small'}>
                     <ChooseDate i18n={i18n}/>
                </DefaultModal>
                <div className="flex-wrap">
                    {editDeparture.civCategories.isLoading &&
                        <div className="checkout_edit_tour_loader">
                            <Loader/>
                        </div>
                    }

                    <div className="close-button" onClick={toggleModalEdit}>
                        ×
                    </div>
                    <Button customClass="btn_wrap red" onClick={toggleModalChoose}>
                        {i18n.change_data_time_number_people}
                    </Button>
                    <div className="item item--row">
                        <div className="choosen-date">
                            {helper.dayDepartureFullTime(i18n.days, i18n.months)}
                        </div>
                        <div className="item item--row item item--people">
                            <svg
                                width="20"
                                height="19"
                                viewBox="0 0 20 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M14.3448 12C14.2933 11.8284 14.2287 11.6613 14.1515 11.5H17.9999C17.9999 11.5 18 11.5 18 11.5C18.3783 11.5001 18.7425 11.6431 19.0198 11.9004C19.2952 12.1558 19.4646 12.5052 19.4948 12.8794L19.5 13.01V13.9998C19.5 13.9999 19.5 13.9999 19.5 14C19.4995 15.3429 18.8876 16.1902 18.0368 16.7249C17.1594 17.2764 16.0116 17.5 15 17.5L14.9988 17.5C14.5638 17.501 14.1304 17.4594 13.7046 17.3762C13.7969 17.2288 13.882 17.0757 13.9596 16.9167C14.3032 16.9714 14.6507 16.9993 14.999 17V17.0001L15.0112 16.9999L15.2782 16.9939L15.2782 16.994L15.2888 16.9935C15.8068 16.9709 16.6594 16.8756 17.4168 16.5047C18.1973 16.1224 18.9055 15.4266 18.9917 14.2412L18.9924 14.2317L18.9927 14.2221L18.9997 14.0171L19 14.0085V14V13V12.9993C18.9997 12.7656 18.9176 12.5394 18.768 12.3598C18.6184 12.1803 18.4106 12.0588 18.1808 12.0163L18.1577 12.012L18.1343 12.01L18.0443 12.002L18.0222 12H18H14.3448ZM13.391 17.8208C13.2125 17.78 13.0353 17.7324 12.86 17.678C12.9773 17.5432 13.0867 17.4018 13.1877 17.2534L13.391 17.8208ZM2.04401 11.499L10.9999 11.5H11.0002C11.3786 11.4999 11.7431 11.6428 12.0206 11.9001C12.2957 12.1552 12.4651 12.5041 12.4957 12.8778L12.5 13.0083V14.4999C12.5 14.4999 12.5 14.5 12.5 14.5C12.4995 16.0282 11.7078 17.0024 10.5566 17.6223C9.3793 18.2561 7.84616 18.5 6.5 18.5C5.18462 18.5 3.68867 18.2671 2.52138 17.6636C1.3768 17.0718 0.576188 16.1456 0.504734 14.7123L0.5 14.4946V12.999C0.5 12.2125 1.1063 11.5665 1.87609 11.5035L2.01333 11.4998L2.04401 11.499ZM2.00006 11.999L1.97509 11.999L1.95025 12.0015L1.85025 12.0115L1.82396 12.0141L1.79811 12.0195C1.60803 12.0591 1.43339 12.1526 1.29509 12.2888L1.29506 12.2888L1.2909 12.293C1.15408 12.431 1.06016 12.6057 1.02051 12.796L1.01507 12.8222L1.01243 12.8487L1.00243 12.9497L1 12.9743V12.999V14.5C1 15.0821 1.13097 15.609 1.42317 16.0714C1.71363 16.5312 2.14148 16.8927 2.68019 17.1824C3.59471 17.675 4.85406 17.9542 6.16757 17.9948L6.16757 17.9948L6.17512 17.9949L6.49212 17.9999L6.5 18.0001L6.50788 17.9999L6.82488 17.9949L6.82489 17.995L6.83243 17.9948C8.14625 17.9542 9.40459 17.6748 10.3199 17.1823L10.3201 17.1822C10.8245 16.9105 11.2322 16.5759 11.521 16.1557C11.8119 15.7322 11.963 15.2495 11.9942 14.714L11.9946 14.7062L11.9948 14.6984L11.9998 14.5124L12 14.5124V14.499V13V12.9993C11.9997 12.7656 11.9176 12.5394 11.768 12.3598C11.6184 12.1803 11.4106 12.0588 11.1808 12.0163L11.1577 12.012L11.1343 12.01L11.0443 12.002L11.0222 12L11.0001 12L2.00006 11.999ZM6.5 0.5C7.56087 0.5 8.57828 0.921427 9.32843 1.67157C10.0786 2.42172 10.5 3.43913 10.5 4.5C10.5 5.56087 10.0786 6.57828 9.32843 7.32843C8.57828 8.07857 7.56087 8.5 6.5 8.5C5.43913 8.5 4.42172 8.07857 3.67157 7.32843C2.92143 6.57828 2.5 5.56087 2.5 4.5C2.5 3.43913 2.92143 2.42172 3.67157 1.67157C4.42172 0.921427 5.43913 0.5 6.5 0.5ZM15.5 2.5C16.2956 2.5 17.0587 2.81607 17.6213 3.37868C18.1839 3.94129 18.5 4.70435 18.5 5.5C18.5 6.29565 18.1839 7.05871 17.6213 7.62132C17.0587 8.18393 16.2956 8.5 15.5 8.5C14.7044 8.5 13.9413 8.18393 13.3787 7.62132C12.8161 7.05871 12.5 6.29565 12.5 5.5C12.5 4.70435 12.8161 3.94129 13.3787 3.37868C13.9413 2.81607 14.7044 2.5 15.5 2.5ZM6.5 1C4.56986 1 3 2.56986 3 4.5C3 6.43014 4.56986 8 6.5 8C8.43014 8 10 6.43014 10 4.5C10 2.56986 8.43014 1 6.5 1ZM15.5 3C14.1209 3 13 4.12086 13 5.5C13 6.87914 14.1209 8 15.5 8C16.8791 8 18 6.87914 18 5.5C18 4.12086 16.8791 3 15.5 3Z"
                                    fill="black"
                                    stroke="#E10600"
                                ></path>
                            </svg>
                            <strong>{i18n.number_people}:</strong>
                            <div>{editDeparture.numberPeopleOrCiv}</div>
                        </div>
                        { editDeparture.civCategories && <CivitatisCategoriesCheckout model={editDeparture.civCategories}/> }
                        <FormEdit i18n={i18n}/>
                    </div>
                </div>
            </div>
        </div>
    );
})

