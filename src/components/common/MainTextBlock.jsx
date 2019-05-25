import React from "react";

import './common.scss'

const MainTextBlock = (props) => {
    return (
        <div className="MainTextBlock">
            {props.title}
            <span>{props.subtitle}</span>
        </div>
    )
}

export default MainTextBlock;