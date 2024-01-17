import './style.css';


export default async function AllCities({ locale, title, id }) {

    return (
       
        <section className="all_cities">
            <div className="container">
                <h1>{title}</h1>
                <div className='items'>
                    <div className='item'>
                        <div className='item_title'>Afghanistan</div>
                        <div className='item_cities'>
                            <a href="http://dev.oneporttest.com/test-city-1"><span>- Test City - 1</span></a>
                            <a href="http://dev.oneporttest.com/test-city-1"><span>- Test City - 1</span></a>
                        </div>
                    </div>
                </div>  
            </div>   
        </section>
    
       
    )
}
