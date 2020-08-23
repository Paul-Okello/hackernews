import React from 'react'

export default function Search({ value, onChange, children, onSubmit }) {

    return (
        <form onSubmit={onSubmit}>
        {children}
         <input 
         type="text"
         onChange={onChange}
         value={value}
        />
        <button type="submit">
            {children}
        </button>
        </form>
    )
}