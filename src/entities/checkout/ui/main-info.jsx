import {CheckoutStoreContext} from "@/entities/checkout/store/checkout-store";
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import Image from "next/image";
import AdditionalInformation from "@/entities/checkout/ui/additional-information";
import {HelperDateHtml} from "@/shared/helpers/helperDateHtml";

export default observer(function MainInfo({i18n}) {
    const {checkoutInfo, isSelfGuide} = useContext(CheckoutStoreContext);
    const helper = new HelperDateHtml(checkoutInfo.activityDate)
    return (<div className="main_info">
            <div className="left_side">
                <ul>
                    <li>
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6.20302 0.999986L6.25002 0.997986L6.29602 0.998986C6.31879 1.00026 6.34148 1.00259 6.36402 1.00599L6.38002 1.00999C6.46841 1.0246 6.55324 1.05582 6.63002 1.10199L6.68302 1.13599L11.753 4.70099L16.82 1.13999C16.9252 1.06611 17.0475 1.02049 17.1753 1.00749C17.3032 0.994487 17.4322 1.01455 17.5501 1.06574C17.6679 1.11694 17.7706 1.19755 17.8484 1.29986C17.9261 1.40216 17.9763 1.52273 17.994 1.64999L18.001 1.75399V12.386C18.001 12.4888 17.9799 12.5904 17.9389 12.6847C17.898 12.779 17.8381 12.8638 17.763 12.934L17.683 13L12.183 16.866C12.0628 16.9515 11.9199 16.9993 11.7725 17.0034C11.6251 17.0075 11.4798 16.9677 11.355 16.889L6.25002 13.297L1.18002 16.862C1.07489 16.9359 0.952542 16.9815 0.824709 16.9945C0.696877 17.0075 0.567848 16.9874 0.449996 16.9362C0.332144 16.885 0.229421 16.8044 0.151679 16.7021C0.0739363 16.5998 0.0237814 16.4792 0.00602341 16.352L-0.000976562 16.248V5.61599C-0.000970061 5.51321 0.0201597 5.41153 0.0611012 5.31726C0.102043 5.22299 0.161922 5.13815 0.237023 5.06799L0.317023 5.00199L5.81702 1.13599C5.87835 1.09265 5.94574 1.05861 6.01702 1.03499L6.14002 1.00699L6.20302 0.998986V0.999986ZM16.501 3.19699L12.501 6.00899V14.808L16.501 11.996V3.19599V3.19699ZM5.50002 3.19299L1.50002 6.00499V14.805L5.50002 11.992V3.19299ZM7.00202 3.19299V11.993L11.002 14.804V6.00499L7.00202 3.19299Z"
                                fill="#E10600"
                            ></path>
                        </svg>
                        <strong>{i18n.tour}: </strong>
                        <p dangerouslySetInnerHTML={{__html: checkoutInfo.tourName ?? ''}}></p>
                    </li>
                    <li>
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11 21.5C16.799 21.5 21.5 16.799 21.5 11C21.5 5.201 16.799 0.5 11 0.5C5.201 0.5 0.5 5.201 0.5 11C0.5 16.799 5.201 21.5 11 21.5ZM11 2C11.774 2 12.7122 2.711 13.5012 4.42025C13.781 5.02775 14.0247 5.7275 14.2213 6.5H7.77875C7.97525 5.7275 8.219 5.027 8.49875 4.42025C9.28775 2.711 10.226 2 11 2ZM7.1375 3.79175C6.77 4.58675 6.4655 5.50025 6.23675 6.5H3.20375C4.24211 4.70503 5.86657 3.32209 7.80425 2.5835C7.55141 2.96846 7.32826 3.37213 7.13675 3.791L7.1375 3.79175ZM5.9585 8C5.81815 8.99381 5.74847 9.99633 5.75 11C5.75 12.0395 5.82275 13.0475 5.95925 14H2.51225C2.17215 13.0364 1.99891 12.0219 2 11C2 9.9485 2.18 8.93825 2.51225 8H5.95925H5.9585ZM6.236 15.5C6.46475 16.4998 6.76925 17.4132 7.136 18.2083C7.33325 18.6357 7.556 19.0422 7.8035 19.4158C5.86625 18.6772 4.2421 17.2945 3.20375 15.5H6.2375H6.236ZM7.77875 15.5H14.2197C14.0437 16.2138 13.8027 16.9099 13.4998 17.5798C12.713 19.289 11.7747 20 11 20C10.2253 20 9.28775 19.289 8.49875 17.5798C8.19584 16.9099 7.95483 16.2138 7.77875 15.5ZM14.5235 14H7.475C7.32323 13.0072 7.24801 12.0043 7.25 11C7.25 9.94475 7.33025 8.936 7.475 8H14.525C14.6698 8.936 14.75 9.94475 14.75 11C14.75 12.0553 14.6698 13.064 14.525 14H14.5235ZM15.7625 15.5H18.7955C17.757 17.2947 16.1325 18.6773 14.195 19.4158C14.4425 19.0422 14.6652 18.6357 14.8625 18.2083C15.2292 17.4132 15.5338 16.4998 15.7625 15.5ZM19.487 14H16.04C16.1765 13.0475 16.2493 12.0395 16.2493 11C16.2493 9.9605 16.1765 8.9525 16.04 8H19.487C19.8274 8.96355 20.0008 9.9781 20 11C20 12.0515 19.82 13.0618 19.4877 14H19.487ZM14.1957 2.5835C16.1334 3.32209 17.7579 4.70503 18.7962 6.5H15.7625C15.5338 5.50025 15.2292 4.58675 14.8625 3.79175C14.671 3.37288 14.4478 2.96921 14.195 2.58425L14.1957 2.5835Z"
                                fill="#E10600"
                            ></path>
                        </svg>
                        <strong>{i18n.language}: </strong>
                        {checkoutInfo.language}
                    </li>
                    <li>
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M14.75 0C15.612 0 16.4386 0.34241 17.0481 0.951903C17.6576 1.5614 18 2.38805 18 3.25V14.75C18 15.612 17.6576 16.4386 17.0481 17.0481C16.4386 17.6576 15.612 18 14.75 18H3.25C2.38805 18 1.5614 17.6576 0.951903 17.0481C0.34241 16.4386 0 15.612 0 14.75V3.25C0 2.38805 0.34241 1.5614 0.951903 0.951903C1.5614 0.34241 2.38805 0 3.25 0H14.75ZM16.5 5.5H1.5V14.75C1.5 15.716 2.284 16.5 3.25 16.5H14.75C15.2141 16.5 15.6592 16.3156 15.9874 15.9874C16.3156 15.6592 16.5 15.2141 16.5 14.75V5.5ZM4.75 11.5C5.08152 11.5 5.39946 11.6317 5.63388 11.8661C5.8683 12.1005 6 12.4185 6 12.75C6 13.0815 5.8683 13.3995 5.63388 13.6339C5.39946 13.8683 5.08152 14 4.75 14C4.41848 14 4.10054 13.8683 3.86612 13.6339C3.6317 13.3995 3.5 13.0815 3.5 12.75C3.5 12.4185 3.6317 12.1005 3.86612 11.8661C4.10054 11.6317 4.41848 11.5 4.75 11.5ZM9 11.5C9.33152 11.5 9.64946 11.6317 9.88388 11.8661C10.1183 12.1005 10.25 12.4185 10.25 12.75C10.25 13.0815 10.1183 13.3995 9.88388 13.6339C9.64946 13.8683 9.33152 14 9 14C8.66848 14 8.35054 13.8683 8.11612 13.6339C7.8817 13.3995 7.75 13.0815 7.75 12.75C7.75 12.4185 7.8817 12.1005 8.11612 11.8661C8.35054 11.6317 8.66848 11.5 9 11.5ZM4.75 7.5C5.08152 7.5 5.39946 7.6317 5.63388 7.86612C5.8683 8.10054 6 8.41848 6 8.75C6 9.08152 5.8683 9.39946 5.63388 9.63388C5.39946 9.8683 5.08152 10 4.75 10C4.41848 10 4.10054 9.8683 3.86612 9.63388C3.6317 9.39946 3.5 9.08152 3.5 8.75C3.5 8.41848 3.6317 8.10054 3.86612 7.86612C4.10054 7.6317 4.41848 7.5 4.75 7.5ZM9 7.5C9.33152 7.5 9.64946 7.6317 9.88388 7.86612C10.1183 8.10054 10.25 8.41848 10.25 8.75C10.25 9.08152 10.1183 9.39946 9.88388 9.63388C9.64946 9.8683 9.33152 10 9 10C8.66848 10 8.35054 9.8683 8.11612 9.63388C7.8817 9.39946 7.75 9.08152 7.75 8.75C7.75 8.41848 7.8817 8.10054 8.11612 7.86612C8.35054 7.6317 8.66848 7.5 9 7.5ZM13.25 7.5C13.5815 7.5 13.8995 7.6317 14.1339 7.86612C14.3683 8.10054 14.5 8.41848 14.5 8.75C14.5 9.08152 14.3683 9.39946 14.1339 9.63388C13.8995 9.8683 13.5815 10 13.25 10C12.9185 10 12.6005 9.8683 12.3661 9.63388C12.1317 9.39946 12 9.08152 12 8.75C12 8.41848 12.1317 8.10054 12.3661 7.86612C12.6005 7.6317 12.9185 7.5 13.25 7.5ZM14.75 1.5H3.25C2.78587 1.5 2.34075 1.68437 2.01256 2.01256C1.68437 2.34075 1.5 2.78587 1.5 3.25V4H16.5V3.25C16.5 2.78587 16.3156 2.34075 15.9874 2.01256C15.6592 1.68437 15.2141 1.5 14.75 1.5Z"
                                fill="#E10600"
                            ></path>
                        </svg>
                        <strong>{i18n.date}: </strong>
                        {helper.dayDeparture(i18n.days, i18n.months)}
                    </li>
                    <li>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10 0C15.523 0 20 4.478 20 10C20 15.522 15.523 20 10 20C4.477 20 0 15.522 0 10C0 4.478 4.477 0 10 0ZM10 1.667C5.405 1.667 1.667 5.405 1.667 10C1.667 14.595 5.405 18.333 10 18.333C14.595 18.333 18.333 14.595 18.333 10C18.333 5.405 14.595 1.667 10 1.667ZM9.25 4C9.43124 4.00001 9.60634 4.06564 9.74293 4.18477C9.87952 4.30389 9.96835 4.46845 9.993 4.648L10 4.75V10H13.25C13.44 10.0001 13.6229 10.0722 13.7618 10.202C13.9006 10.3317 13.9851 10.5093 13.998 10.6989C14.011 10.8885 13.9515 11.0759 13.8316 11.2233C13.7117 11.3707 13.5402 11.4671 13.352 11.493L13.25 11.5H9.25C9.06876 11.5 8.89366 11.4344 8.75707 11.3152C8.62048 11.1961 8.53165 11.0316 8.507 10.852L8.5 10.75V4.75C8.5 4.55109 8.57902 4.36032 8.71967 4.21967C8.86032 4.07902 9.05109 4 9.25 4Z"
                                fill="#E10600"
                            ></path>
                        </svg>
                        <strong>{i18n.time}: </strong>
                        {isSelfGuide ? i18n.flexible : checkoutInfo.startTime}
                    </li>
                    <li>
                        <svg
                            width="18"
                            height="20"
                            viewBox="0 0 18 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9 3C11.2543 3 13.4163 3.89553 15.0104 5.48959C16.6045 7.08365 17.5 9.24566 17.5 11.5C17.5 13.7543 16.6045 15.9163 15.0104 17.5104C13.4163 19.1045 11.2543 20 9 20C6.74566 20 4.58365 19.1045 2.98959 17.5104C1.39553 15.9163 0.5 13.7543 0.5 11.5C0.5 9.24566 1.39553 7.08365 2.98959 5.48959C4.58365 3.89553 6.74566 3 9 3ZM9 4.5C7.14348 4.5 5.36301 5.2375 4.05025 6.55025C2.7375 7.86301 2 9.64348 2 11.5C2 13.3565 2.7375 15.137 4.05025 16.4497C5.36301 17.7625 7.14348 18.5 9 18.5C10.8565 18.5 12.637 17.7625 13.9497 16.4497C15.2625 15.137 16 13.3565 16 11.5C16 9.64348 15.2625 7.86301 13.9497 6.55025C12.637 5.2375 10.8565 4.5 9 4.5ZM9 6C9.18124 6.00001 9.35634 6.06564 9.49293 6.18477C9.62952 6.30389 9.71835 6.46845 9.743 6.648L9.75 6.75V11.25C9.74994 11.44 9.67776 11.6229 9.54803 11.7618C9.4183 11.9006 9.2407 11.9851 9.05112 11.998C8.86154 12.011 8.67411 11.9515 8.5267 11.8316C8.37929 11.7117 8.2829 11.5402 8.257 11.352L8.25 11.25V6.75C8.25 6.55109 8.32902 6.36032 8.46967 6.21967C8.61032 6.07902 8.80109 6 9 6ZM16.147 3.114L16.23 3.174L17.388 4.138C17.533 4.25995 17.6265 4.43225 17.6496 4.62029C17.6728 4.80833 17.6239 4.99817 17.5129 5.15166C17.4018 5.30515 17.2368 5.41092 17.0509 5.44771C16.8651 5.4845 16.6722 5.4496 16.511 5.35L16.429 5.29L15.27 4.326C15.125 4.20405 15.0315 4.03175 15.0084 3.84371C14.9852 3.65567 15.0341 3.46584 15.1451 3.31234C15.2562 3.15885 15.4212 3.05308 15.6071 3.01629C15.7929 2.9795 15.9858 3.0144 16.147 3.114ZM11.25 0.5C11.44 0.500058 11.6229 0.572245 11.7618 0.701973C11.9006 0.831701 11.9851 1.0093 11.998 1.19888C12.011 1.38846 11.9515 1.57589 11.8316 1.7233C11.7117 1.87071 11.5402 1.9671 11.352 1.993L11.25 2H6.75C6.55998 1.99994 6.37706 1.92776 6.23821 1.79803C6.09936 1.6683 6.01493 1.4907 6.00197 1.30112C5.98902 1.11154 6.04851 0.924108 6.16843 0.776701C6.28835 0.629294 6.45975 0.532901 6.648 0.507L6.75 0.5H11.25Z"
                                fill="#E10600"
                            ></path>
                        </svg>
                        <strong>{i18n.duration}: </strong>
                        {checkoutInfo.duration}
                    </li>
                    <li>
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
                        <strong>{i18n.number_people}: </strong>
                        {checkoutInfo.numberPeople}
                    </li>
                    {!isSelfGuide ? <li>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1 15.67V15.7276L1.01308 15.7836C1.19299 16.5547 1.69854 17.1283 2.48406 17.493C3.24651 17.847 4.27716 18.009 5.567 18.009C6.85423 18.009 7.87375 17.8496 8.61556 17.4969C9.38549 17.1309 9.86026 16.5513 9.99282 15.7774L10 15.7355V15.693V14.25C10 13.9185 9.8683 13.6005 9.63388 13.3661C9.39946 13.1317 9.08152 13 8.75 13H2.25C1.91848 13 1.60054 13.1317 1.36612 13.3661C1.1317 13.6005 1 13.9185 1 14.25V15.67ZM16.295 7.5H16.0896L15.9435 7.6444L13.7775 9.7854L13.7774 9.7855C13.6722 9.88954 13.5386 9.96014 13.3934 9.98843C13.2482 10.0167 13.0978 10.0014 12.9613 9.94446C12.8247 9.88751 12.7081 9.79145 12.626 9.66835C12.5439 9.54526 12.5001 9.40065 12.5 9.2527V7.986V7.53879L12.0556 7.4891C11.6278 7.44127 11.2326 7.23745 10.9456 6.91662C10.6587 6.59579 10.5 6.18045 10.5 5.75C10.5 5.74999 10.5 5.74999 10.5 5.74998V2.25C10.5 1.78587 10.6844 1.34075 11.0126 1.01256C11.3408 0.684374 11.7859 0.5 12.25 0.5H17.75C18.2141 0.5 18.6592 0.684374 18.9874 1.01256C19.3156 1.34075 19.5 1.78587 19.5 2.25V5.75C19.5 5.97981 19.4547 6.20738 19.3668 6.4197C19.2788 6.63201 19.1499 6.82493 18.9874 6.98744C18.8249 7.14994 18.632 7.27884 18.4197 7.36679C18.2074 7.45473 17.9798 7.5 17.75 7.5H16.295ZM12.25 7H12.999V8.654V9.85055L13.8503 9.00975L15.8853 7H17.751C18.0825 7 18.4005 6.8683 18.6349 6.63388C18.8693 6.39946 19.001 6.08152 19.001 5.75V2.25C19.001 1.91848 18.8693 1.60054 18.6349 1.36612C18.4005 1.13169 18.0825 1 17.751 1H17.75H12.25C11.9185 1 11.6005 1.1317 11.3661 1.36612C11.1317 1.60054 11 1.91848 11 2.25V5.75C11 6.44014 11.5599 7 12.25 7ZM8.75 12.5C9.21413 12.5 9.65925 12.6844 9.98744 13.0126C10.3156 13.3408 10.5 13.7859 10.5 14.25V15.7335L10.4947 15.8048C10.3593 16.7032 9.89927 17.3532 9.11797 17.7975C8.30732 18.2585 7.12712 18.509 5.567 18.509C4.0137 18.509 2.82502 18.2618 1.99122 17.8032C1.18583 17.3601 0.69276 16.7116 0.509252 15.8234L0.5 15.7262V14.25C0.5 13.7859 0.684374 13.3408 1.01256 13.0126C1.34075 12.6844 1.78587 12.5 2.25 12.5H8.75ZM5.5 4.5C5.89397 4.5 6.28407 4.5776 6.64805 4.72836C7.01203 4.87913 7.34274 5.1001 7.62132 5.37868C7.8999 5.65726 8.12087 5.98797 8.27164 6.35195C8.4224 6.71593 8.5 7.10603 8.5 7.5C8.5 7.89397 8.4224 8.28407 8.27164 8.64805C8.12087 9.01203 7.8999 9.34274 7.62132 9.62132C7.34274 9.8999 7.01203 10.1209 6.64805 10.2716C6.28407 10.4224 5.89397 10.5 5.5 10.5C4.70435 10.5 3.94129 10.1839 3.37868 9.62132C2.81607 9.05871 2.5 8.29565 2.5 7.5C2.5 6.70435 2.81607 5.94129 3.37868 5.37868C3.94129 4.81607 4.70435 4.5 5.5 4.5ZM5.5 5C4.83696 5 4.20107 5.26339 3.73223 5.73223C3.26339 6.20107 3 6.83696 3 7.5C3 8.16304 3.26339 8.79893 3.73223 9.26777C4.20107 9.73661 4.83696 10 5.5 10C6.16304 10 6.79893 9.73661 7.26777 9.26777C7.73661 8.79893 8 8.16304 8 7.5C8 6.83696 7.73661 6.20107 7.26777 5.73223C6.79893 5.26339 6.16304 5 5.5 5Z"
                                fill="black"
                                stroke="#E10600"
                            ></path>
                        </svg>
                        <strong>{i18n.guide}: </strong>
                        {checkoutInfo.brandName}
                    </li> : null}
                    {checkoutInfo.voucher ? <li>
                            <a style={{color: '#0693e3'}} href={checkoutInfo.voucher} download
                               target="_blank">{i18n.download_voucher}</a>
                        </li>

                        : null}
                </ul>
            </div>

            <div className="right_side">
                <div className="point">
                    <svg
                        width="18"
                        height="22"
                        viewBox="0 0 18 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.734 20.816C13.3485 18.515 18 13.814 18 9.5C18 7.11305 17.0518 4.82387 15.364 3.13604C13.6761 1.44821 11.3869 0.5 9 0.5C6.61305 0.5 4.32387 1.44821 2.63604 3.13604C0.948211 4.82387 3.55683e-08 7.11305 0 9.5C0 13.814 4.65 18.515 7.266 20.816C7.74317 21.2419 8.3604 21.4773 9 21.4773C9.6396 21.4773 10.2568 21.2419 10.734 20.816ZM6 9.5C6 8.70435 6.31607 7.94129 6.87868 7.37868C7.44129 6.81607 8.20435 6.5 9 6.5C9.79565 6.5 10.5587 6.81607 11.1213 7.37868C11.6839 7.94129 12 8.70435 12 9.5C12 10.2956 11.6839 11.0587 11.1213 11.6213C10.5587 12.1839 9.79565 12.5 9 12.5C8.20435 12.5 7.44129 12.1839 6.87868 11.6213C6.31607 11.0587 6 10.2956 6 9.5Z"
                            fill="#E10600"
                        ></path>
                    </svg>
                    <div>
                        {i18n.start_point}: <span>{checkoutInfo.address}</span>
                    </div>
                </div>
                {checkoutInfo.locationDescription && (<div className="direction">
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M20 0.5H2C1.60218 0.5 1.22064 0.658035 0.93934 0.93934C0.658035 1.22064 0.5 1.60218 0.5 2V20C0.5 20.3978 0.658035 20.7794 0.93934 21.0607C1.22064 21.342 1.60218 21.5 2 21.5H20C20.3978 21.5 20.7794 21.342 21.0607 21.0607C21.342 20.7794 21.5 20.3978 21.5 20V2C21.5 1.60218 21.342 1.22064 21.0607 0.93934C20.7794 0.658035 20.3978 0.5 20 0.5ZM15.5 11H14V6.0605L9.098 10.9625C8.74882 11.3099 8.472 11.7231 8.28353 12.1782C8.09506 12.6333 7.99869 13.1212 8 13.6138V18.5H6.5V13.6138C6.49806 12.924 6.63295 12.2407 6.89686 11.6035C7.16078 10.9662 7.54847 10.3877 8.0375 9.90125L12.9395 5H8V3.5H15.5V11Z"
                                fill="#E10600"
                            ></path>
                        </svg>
                        <div>
                            <span>{i18n.directions}:</span> {checkoutInfo.locationDescription}
                        </div>
                    </div>)}
                {checkoutInfo.isShowMap ? <div className="flex-wrap">
                    <div className="iframe-wrap">
                        <iframe
                            width="1300"
                            height="500"
                            frameBorder="0"
                            scrolling="no"
                            src={`https://maps.google.com/maps?q=${checkoutInfo.coordinates.lat},${checkoutInfo.coordinates.lng}&hl=en&z=${checkoutInfo.coordinates.zoom}&output=embed`}
                        ></iframe>
                    </div>
                    {checkoutInfo.mpvImage?.url && (<div className="images_wrap">
                            <div className="img_first">
                                <Image src={checkoutInfo.mpvImage.url} width={350} height={240}
                                       alt="Meeting point image"/>
                            </div>
                        </div>)}
                </div> : null}

                <AdditionalInformation i18n={i18n}/>

            </div>
        </div>);
})
