import Card from "@/shared/ui/card/card"

export default function FreeTours({cards}) {
  const cards_ = [1,2,3];
  return (
    <section className='free-tours'>
        {cards_.map((item , index) => <Card key={index}/>)}
    </section>

  )
}
