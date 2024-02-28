
export default function FormReview({ pageData, i18n }) {
    return (
        <form className="review_form">
            <h1>{pageData.thank}</h1>
            <textarea placeholder={pageData.placeHolder} name="reply"></textarea>
            <button className="sub_but">{i18n.send}</button>
        </form>
    )
}