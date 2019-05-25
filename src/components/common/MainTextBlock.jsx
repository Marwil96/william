import React from "react";

import styling from './common.scss'

const MainTextBlock = (props) => {
    return (
        <div className="MainTextBlock">
            {props.title}
            <span>{props.subtitle}</span>
        </div>
    )
}

export default MainTextBlock;