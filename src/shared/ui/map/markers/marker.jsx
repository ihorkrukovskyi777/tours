export default function MarkerDefault({icon , status , colors}) {
    return(
    
        <div className="icon">
            <img src={icon} alt="" />
            <div class="circles">
                <span style={{background: '#ccc'}}>
                </span>
            </div>
        </div>

        // <div class="marker medium">
        //     <div class="marker_content" style={{background: "conic-gradient( #baee64 0%,#baee64 100%)"}}></div>
        // </div>
       

    )
}