import {observer} from "mobx-react-lite";
import HowMany from "@entities/lib/calendar/ui/how-many";


export interface ViewModel {
    peopleNumber: number
    isEmpty: boolean,
    onChangePeople(val: number): void
}

interface Props {
    viewModel: ViewModel
}

const HowManyView = observer(({viewModel}: Props) => {

    return (
        <HowMany
            people={viewModel.peopleNumber}
            isEmpty={viewModel.isEmpty}
            changePeople={viewModel.onChangePeople}
        />
    )
})

export default HowManyView