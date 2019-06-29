import React from "react";
import './common.scss'

const Loader = () => {
    return (
        <div className='Loader'>
            <svg width="101" height="208" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path  d="M.75 26.75l93-26.5v21l-65 16.5 65 17v18.5l-57 15 64 19v18.5l-61 18.5 61 18v19l-93 26.5v-21.5l64.5-16-64.5-17.5v-18l57.5-15-64.5-19v-18.5l61-18.5-61-18v-19z" fill="#C4C4C4"/>
            </svg>
        </div>
    )
}

export default Loader;