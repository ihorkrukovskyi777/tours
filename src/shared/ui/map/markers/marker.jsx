import IcloudImage from "../../icloud-image"
import {observer} from "mobx-react-lite";

export default observer(function MarkerDefault({icon , status , isActive, colors , size , markerActive = false}) {

    return(
        <>
            {isActive ?
                <div className={'icon active'}>
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
})
