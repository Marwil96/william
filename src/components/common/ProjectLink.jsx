import React from "react";

import './common.scss'

const ProjectLink = (props) => {
    return (
        <div className='ProjectLink' data-contactlink={props.imageUrl}>
            <span >{props.label}</span>
            <h3>{props.title}</h3>
        </div>
    )
}

export default ProjectLink;