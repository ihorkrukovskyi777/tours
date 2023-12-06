import Card from "@/shared/ui/card/card"
import Reviews from "@/shared/ui/reviews/reviews";
import LanguageImages from "@/shared/ui/language-images";
import ClockSvg from '@/assets/images/svg/clock-svg'
import CakendarSvg from '@/assets/images/svg/calendar-svg'
import DefaultFlag from '@/assets/images/languages/USUKflag.jpg'
import './style.css';

const dataSlider = [ 
    {id: 121212, title:'Free Witchcraft Tour London'},
    {id: 533, title:'Free Witchcraft Tour Lviv'},
    {id: 1324, title:'Free Witchcraft Tour Madrid'},
]

const languagesAll = [DefaultFlag , DefaultFlag , DefaultFlag];
export default function MostPopularTours({title='Most Popular Tours' , items=[dataSlider]}) {
  return (
    <section className="most_popular_tour">
        <div className="container">
            <div className="wrapper">
                <h2 className="title">{title}</h2>
                <div className="items">
                    {items.map((item) => {
                        return (
                            <Card key={item.id} url={item} title={item.title} topElement={<LanguageImages data={languagesAll} />} bottomElement={<Reviews rating={2} count_reviews={1111} />} >
                                <div className="item_bottom">
                                    <div className="elem">
                                        <ClockSvg/>
                                        <span className="second">Duration:</span>  
                                        <span>2-2.5 Hours</span> 
                                    </div>
                                    <div className="elem">
                                        <CakendarSvg/>
                                        <span className="second">Next Tour:</span>  
                                        <span>Saturday, 18:20:</span> 
                                    </div>
                                       
                                </div> 
                            </Card>
                        ) 
                    })}
                </div>    
            </div>
        </div>   
    </section>
    
  )
}
