'use client';
import Dropdown from '@/shared/ui/selectors/dropdown/dropdown';
import './style.css'

export default function Faqs( { questions = [] }) {
    return (
        <section className="faq" style={{display: 'none'}}>
            <div className="container">
                <h2>Faq</h2>
                <div className="wrapper">
                    {questions?.map((item , index) => <Dropdown key={index} title={item.title} id={'panelid_'+index }>{item.text}</Dropdown>)}
                 </div>
            </div>
        </section>

  )
}
