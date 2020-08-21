import React, { Component } from 'react'


export default function Search({ value, onChange, children }) {

    return (
        <form action="">
        {children}
         <input 
         type="text"
         onChange={onChange}
         value={value}
        />
        </form>
    )
}
