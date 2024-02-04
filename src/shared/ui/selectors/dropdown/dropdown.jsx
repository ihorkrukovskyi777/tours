'use client'
import React, { useState } from 'react';
import AnimateHeight from 'react-animate-height';
export default function Dropdown({title , children , id}) {
    const [height, setHeight] = useState(0);
    return (
        <div className="block_item">
            <button
                aria-expanded={height !== 0}
                aria-controls={id}
                onClick={() => setHeight(height === 0 ? 'auto' : 0)}
            >
                <div className="title">{title}</div>
                <div className="icon">
                    <span className="horizontal"></span>
                    <span className="vertical"></span>
                </div>
            </button>
          
            <AnimateHeight
                id={id}
                className="block_text"
                duration={500}
                height={height} // see props documentation below
            >   
                <div className="text">
                {children}
                </div>
                
            </AnimateHeight>
        </div>
  )
}
