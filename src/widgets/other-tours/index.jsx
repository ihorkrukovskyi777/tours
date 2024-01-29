import './style.css';

const dataSlider = [
    {id: 121212, title:'Free Witchcraft Tour London'},
    {id: 533, title:'Free Witchcraft Tour Lviv'},
    {id: 1324, title:'Free Witchcraft Tour Madrid'},
]

export default function OtherTours({title='Other Tours in London' , items=dataSlider }) {
    const tours = await
  return (
    <section className="other_tours">
        <div className="container">
            <h2 className="title">{title}</h2>
            <div className="items">
                {items.map((item) => {
                    return (
                        <a key={item.id} href={item.title}>
                            <div className="item">
                                image
                                <div className="intro">
                                    <div className="title-wrap">{item.title}</div>
                                </div>
                            </div>
                        </a>
                    )
                })}
            </div>
        </div>
    </section>

  )
}
