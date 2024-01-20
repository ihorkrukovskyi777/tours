"use client";
import React, { useState , useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { blogPosts } from '@/entities/api';

const cities = blogPosts();

export default function DropdownSearch() {
    const [text, setText] = useState('');
    const [debouncedText] = useDebounce(text, 700, { maxWait: 2000 });

    useEffect(() => {
        cities.then((result) => {
            console.log('Promise result:', result);
        }).catch((error) => {
            console.error('Promise error:', error);
        });
    },[debouncedText]);

    
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
                        setText(e.target.value);
                    }}/> 
            </label>
            <div id="result"></div>
        </form>
    )
}


