import React from "react";

import './common.scss'

const MainTextBlock = (props) => {
    return (
        <div className="MainTextBlock">
            <span className='MainTextBlock-title'>{props.title}</span>
            <span className='MainTextBlock-subtitle'>{props.subtitle}</span>
        </div>
    )
}

export default MainTextBlock;