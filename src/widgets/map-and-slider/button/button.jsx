'use client';
import './style.css';

export default function Button({title }) {
  
    return (
      <button>{title}<span class="status"></span></button>    
    )
}
