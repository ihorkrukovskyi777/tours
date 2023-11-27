import  './style.css'

export default function Hours({size='normal' , children , time}) {

  return (
    <div className={size}>
        {children} {time}
    </div>
  )
}
