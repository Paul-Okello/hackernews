import React, { Component } from 'react'
import "./Button.css"
export default function Button({ onClick, className, children })  {

    return (
        <button
            onClick={onClick}
            className='button-inline'
            type="button"
        >
            {children}
        </button>
    );
    
}
