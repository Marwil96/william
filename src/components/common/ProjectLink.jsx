import React from "react";
import { Link } from "react-router-dom";

import './common.scss'

const internalLink = (props) => {

    if(props.type === 'external') {
        return (
            <a href={props.link} rel="noopener noreferrer" target="_blank" className='ProjectLink' data-contactlink={props.imageUrl}>
                <span >{props.label}</span>
                <h3>{props.title}</h3>
            </a>
        )
    } else {
        return (
            <Link to={'case/' + props.link} className='ProjectLink' data-contactlink={props.imageUrl}>
                <span >{props.label}</span>
                <h3>{props.title}</h3>
            </Link>
        )
    }
}

const ProjectLink = (props) => {
    return (
        internalLink(props)
    )
}

export default ProjectLink;