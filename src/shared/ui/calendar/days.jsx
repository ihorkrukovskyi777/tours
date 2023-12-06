import classNames from "classnames";
export default function Days({lists , nextStep}) {
    return lists?.map((item) => <div className={classNames({'disable':item.previusMonth})} key={item.fullDate}  onClick={()=> nextStep({stepOpen:2})}>{item.day}</div>)
}
    
    