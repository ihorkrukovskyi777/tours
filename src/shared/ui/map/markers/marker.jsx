import IcloudImage from "../../icloud-image"

export default function MarkerDefault({icon , status , colors , size , markerActive = false}) {
 
    return(
        <>
            {status === "active" ? 
                <div className={`icon ${status}`}>
                    <IcloudImage src={icon} size="500x500" alt={icon} width={64} height={64} />
                    <div className="circles">
                        <span style={{background: '#ccc'}}>
                        </span>
                    </div>
                </div>
            : 
                <div className={`marker ${status}`}>
                    <div className="marker_content" style={{background: "conic-gradient( #baee64 0%,#baee64 100%)"}}></div>
                </div>     
            }
        </>
    )
}