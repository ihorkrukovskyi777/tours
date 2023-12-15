import './style.css';

export default function Breadcrumbs({children}) {
    return (
        <div className='breadcrumbs'>
            <div className='container'>
                {children}
            </div>
        </div>
  )
}
