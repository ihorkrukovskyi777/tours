import classNames from "classnames";

export default function Days({lists, onChange}) {
    return (
        lists?.map((item) => (
            <div
                className={classNames({'disable': item.disabled})}
                key={item.fullDate}
                onClick={() => onChange(item)}
            >
                {item.day}
            </div>
        ))
    )
}

