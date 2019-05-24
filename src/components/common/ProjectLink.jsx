import React from "react";

import styling from './common.scss'

const ProjectLink = (props) => {
    return (
        <div className='ProjectLink'>
            <span >{props.label}</span>
            <h3>{props.title}</h3>
        </div>
    )
}

export default ProjectLink;