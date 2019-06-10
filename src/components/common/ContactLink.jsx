import React from "react";

import './common.scss'

const ProjectLink = (props) => {
    return (
        <a href={props.link} className="ContactLink">
        	<h3>{props.title}</h3>
            <span >{props.label}</span>
        </a>
    )
}

export default ProjectLink;