import Card from "@/shared/ui/card/card"
import Reviews from "@/shared/ui/reviews/reviews"
export default function CardTour({title}) {
  return (
    <Card title={title} bottomElement={<Reviews rating={2} count_reviews={122} />} >
        {children}             
    </Card>
   
  )
}
