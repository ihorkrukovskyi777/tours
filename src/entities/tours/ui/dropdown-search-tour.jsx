"use client"
import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';

export default function DropdownSearch() {

    const [text, setText] = useState('Hello');
    const [value] = useDebounce(text, 1000);

    

    return (
        <form autoComplete="off">
            <label>
                <input 
                    name="q"
                    id="q"
                    type="text"
                    placeholder="Where Are You Going?"
                    defaultValue={''}
                    onChange={(e) => {
                        debounced(e.target.value)
                    }}/> 
            </label>
            <div id="result"></div>
        </form>
    )
}
