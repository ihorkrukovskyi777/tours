import Card from "@/shared/ui/card/card"
import Reviews from "@/widgets/latest-reviews/item/reviews"

export default function CardTour({title, children}) {
    return (
        <Card title={title} bottomElement={<Reviews rating={2} count_reviews={122}/>}>
            {children}
        </Card>

    )
}
