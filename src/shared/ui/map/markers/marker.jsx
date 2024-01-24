export default function MarkerDefault({icon , status , colors}) {
    return(
    
        <div className="icon">
            <img src={icon} alt="" />
            <div className="circles">
                <span style={{background: '#ccc'}}>
                </span>
            </div>
        </div>

        // <div className="marker medium">
        //     <div className="marker_content" style={{background: "conic-gradient( #baee64 0%,#baee64 100%)"}}></div>
        // </div>
       

    )
}