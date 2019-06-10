import React from "react";
import { Link } from "react-router-dom";

import './common.scss'

const ProjectLink = (props) => {
    return (
        <Link to={'case/' + props.link} className='ProjectLink' data-contactlink={props.imageUrl}>
            <span >{props.label}</span>
            <h3>{props.title}</h3>
        </Link>
    )
}

export default ProjectLink;