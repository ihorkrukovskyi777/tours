import CheckoutSection from "@/widgets/checkout"
import OtherTours from "@/widgets/other-tours"
import ChangeOfLanguage from "@/widgets/change-of-language/change-of-language"

export default function Checkout() {
  return (
    <main>
      <CheckoutSection />
      <OtherTours />
      <ChangeOfLanguage />
    </main>
  )
}
