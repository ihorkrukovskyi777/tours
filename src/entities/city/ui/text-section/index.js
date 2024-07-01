import "./style.css";

export default async function TextSection({data , showTitle = false , titleSection = ''}) {
    return (
        <>
            {data ?
                <section className="block_text_section">
                    <div className="container">
                        <div className="top_wrapper">
                            {titleSection !== '' && showTitle ? <h2>{titleSection}</h2> : null}
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