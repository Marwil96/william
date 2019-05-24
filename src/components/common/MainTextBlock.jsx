import React from "react";

import styling from './common.scss'

const MainTextBlock = (props) => {
    return (
        <div className="MainTextBlock">
            <h1>{props.title}</h1>
            <span>{props.subtitle}</span>
        </div>
    )
}

export default MainTextBlock;