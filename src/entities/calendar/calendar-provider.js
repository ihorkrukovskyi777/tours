import Main from "@/entities/calendar/ui/main/main";
import {Provider} from "jotai";

export default function CalendarProvider(props) {
    return (
        <Provider>
            <Main {...props}/>
        </Provider>
    )
}
