import Script from "next/script";

const getSchemaFaq = (answers) => {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: answers?.map((item) => ({
            '@type': 'Question',
            name: item?.title,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item?.text,
            },
        })),
    }
}

export default  function FaqSchema({ questions }) {
    return <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getSchemaFaq(questions)) }}
    />
}