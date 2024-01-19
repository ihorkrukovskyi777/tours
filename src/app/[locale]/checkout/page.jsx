import CheckoutSection from "@/entities/checkout/ui"
import OtherTours from "@/widgets/other-tours"
import ChangeOfLanguage from "@/shared/ui/languages/change-of-language/change-of-language"

export default function Checkout() {
  return (
    <main>
      <CheckoutSection />
      <OtherTours />
      <ChangeOfLanguage />
    </main>
  )
}
