import FullStarSvg from "@/assets/images/svg/full-star"
const person_info = {
    name: 'Ihor Krukovskyi',
    email: 'test@gmail.com',
    phone: '+44 1 1111 111 111',
    BookingID: '12892',
    image: 'url',
    subvendor: 'Sub & Vendor!Mi praesent pulvinar fringilla augue commodo praesent!',
    rate:'4.4',
}

export default function PersonInfo() {
    return (
        <div className="person_info">
            <div className="left_box">
                <ul>
                    <li>
                        <span>Name:</span> {person_info.name}
                    </li>
                    <li>
                        <span>Email:</span> {person_info.email}
                    </li>
                    <li>
                        <span>Phone Number:</span> {person_info.phone}
                    </li>
                    <li>
                        <span>Booking ID:</span> {person_info.BookingID}
                    </li>
                </ul>
            </div>
            <div className="right_box">
                <div className="img_box">
                    image
                </div>
            </div>
            <div className="text_box">
                <div className="name">{person_info.subvendor}</div>
                <div className="rate_box">
                    <FullStarSvg width={20} height={20}/>
                    <span>{person_info.rate}</span>
                </div>
            </div>
        </div>
    )
  }