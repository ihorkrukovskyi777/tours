import IcloudImage from "../../icloud-image"
import {observer} from "mobx-react-lite";

function getFeatheredGradient(blocks, featherNumber) {
    if (featherNumber < 0 || featherNumber > 1) {
        throw new Error('featherNumber out of bounds: must be be in the range 0 to 1');
    }
    const feather = featherNumber / 2;

    const totalWeight = blocks.reduce((sum, block) => sum + Number(block[1]), 0);

    const gradients = [];
    let gradientStop = 0;
    let visualStop = 0;
    blocks.forEach((block, index) => {
        const blockColor = block[0];
        const blockWeightAsPercent = (block[1] / totalWeight) * 100;
        const blockFeather = blockWeightAsPercent * feather;

        if (index === 0) {
            visualStop = 0;
        } else {
            visualStop = gradientStop + blockFeather;
        }
        gradients.push(`${blockColor} ${visualStop}%`);

        gradientStop += blockWeightAsPercent;
        if (index === blocks.length - 1) {
            visualStop = 100;
        } else {
            visualStop = gradientStop - blockFeather;
        }
        gradients.push(`${blockColor} ${visualStop}%`);
    });

    return `conic-gradient( ${gradients.join(',')})`
}
const getGradient = (colors) => {
    const gradient = {};
    for (const color of colors) {
        gradient[color] = 1;
    }
    return Object.entries(gradient);
}
export default observer(function MarkerDefault({icon , status , isActive, colors}) {


    const gradient = getFeatheredGradient(getGradient(colors), 0);

    return(
        <>
            {isActive ?
                <div className={'icon active'}>
                    <IcloudImage src={icon} size="500x500" alt={icon} width={512} height={512} />
                    <div className="circles">
                        {colors.reverse().map(color => {
                            return <span key={color} style={{background: color}}></span>
                        })}
                    </div>
                </div>
            :
                <div className={`marker ${status}`}>
                    <div className="marker_content" style={{background: gradient}}></div>
                </div>
            }
        </>
    )
})
