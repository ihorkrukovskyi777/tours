import CardText from '@/shared/ui/card-text';
import './style.css';
export default function TextBlocks({items=["Best Free Tours in London","Best Free Tours in London"]}) {
  return (
    <section className="text_blocks">
        <div className="container">
            <div className="wrapper">
                {items.map((item , index) =>{
                    return (
                        <CardText key={index} title={item}> 
                            There are many popular and famous Free Walking Tours in London: from the landmark tours in Westminster,
                            the City of London and Notting Hill, to the well-known theme tours like Street Art, Jack the Ripper,
                            Sherlock Holmes, the Beatles, London City Tour and of course a free Harry Potter tour. Additionally,
                            the UK’s capital offers many exciting tours by night that will show you a different side of the city, from spooky ghost walks,
                            to enjoyable pub crawls where you will have fun in centuries-old pubs. If you travel with your kids,
                            London offers a plethora of educational tours ideal for families.
                            There are many different guides and tour providers to pick from,
                        </CardText>
                    )
                })}                                      
            </div>
        </div>   

    </section>
    
  )
}
