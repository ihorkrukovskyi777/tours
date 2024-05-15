import "./style.css";

export default async function TextSection({data , showTitle = false}) {
    return (
        <>
            {data ?
                <section className="text_section">
                    <div className="container">
                        <div className="top_wrapper">
                            {data?.title && showTitle ? <h2>{data?.title}</h2> : null}
                            <div
                                className="description"
                                dangerouslySetInnerHTML={{__html: data?.text ?? ""}}
                            ></div>
                        </div>
                    </div>
                </section>
            : null
            }
        </>
    );
}