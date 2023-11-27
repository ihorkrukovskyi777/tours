import Card from "@/shared/ui/card/card"

export default function FreeTours({cards}) {
  const cards = [1,2,3];  
  return (
    <section className='free-tours'>
        {cards.map((item , index) => <Card key={index}/>)}
    </section>
   
  )
}
