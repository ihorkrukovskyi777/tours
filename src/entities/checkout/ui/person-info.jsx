import FullStarSvg from "@/assets/images/svg/full-star";
const person_info = {
  name: "Ihor Krukovskyi",
  email: "test@gmail.com",
  phone: "+44 1 1111 111 111",
  BookingID: "12892",
  image: "url",
  subvendor:
    "Sub & Vendor!Mi praesent pulvinar fringilla augue commodo praesent!",
  rate: "4.4",
};

export default function PersonInfo({ data }) {
  const {
    name,
    last_name,
    email,
    phone,
    book_id,
    brand_name,
    brand_logo_url,
    averge_rating,
  } = data;
  return (
    <div className="person_info">
      <div className="left_box">
        <ul>
          <li>
            <span>Name:</span> {name + " " + last_name}
          </li>
          <li>
            <span>Email:</span> {email}
          </li>
          <li>
            <span>Phone Number:</span> {phone}
          </li>
          <li>
            <span>Booking ID:</span> {book_id}
          </li>
        </ul>
      </div>
      <div className="right_box">
        <div className="img_box">
          <img
            src={brand_logo_url.url}
            alt={brand_logo_url.alt ? brand_logo_url.alt : "brand logo"}
          />
        </div>
      </div>
      <div className="text_box">
        <div className="name">{brand_name}</div>
        {averge_rating.cnt_reviews && (
          <div className="rate_box">
            <FullStarSvg width={20} height={20} />
            <span>{averge_rating.averge_rating}</span>
          </div>
        )}
      </div>
    </div>
  );
}
