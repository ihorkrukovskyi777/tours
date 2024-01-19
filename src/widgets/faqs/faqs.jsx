'use client';
import Dropdown from '@/shared/ui/selectors/dropdown/dropdown';
import styles from './style.css';

export default function Faqs( { questions = [] }) {


    return (
        <section className="faq">
            <div className="container">
                <h2>Faq</h2>
                <div className="wrapper">
                    {questions?.map((item , index) => <Dropdown key={index} title={item.title} id={'panelid_'+index }>{item.text}</Dropdown>)}
                 </div>
            </div>
        </section>

  )
}
