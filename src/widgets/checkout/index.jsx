import PersonInfo from './person-info';
import MainInfo from './main-info';
import ButtonsInfo from './buttons-info';
import './style.css';

export default function CheckoutSection() {
    return (
        <section className="checkout_section">
            <div className="container">
                <h2>Booking Confirmation</h2>
                <div className="title">Free Harry Potter Tour London</div>
                <PersonInfo data={'111'} />
                <MainInfo data={'11'} />
                <ButtonsInfo />
            </div>
        </section>
      
  )
}
