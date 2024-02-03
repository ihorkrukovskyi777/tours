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
    return <script async={true}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getSchemaFaq(questions)) }}
    />
}