import React from "react";

import './common.scss'

const ProjectLink = (props) => {
    return (
        <a className="ContactLink" data-contactlink='https://www.thebalance.com/thmb/UZS2curMfBJpwbb8LrvpxttXhA0=/2103x1428/filters:fill(auto,1)/Stock-Market-Charts-Are-Useless-56a093595f9b58eba4b1ae5b.jpg'>
        	<h3>{props.title}</h3>
            <span >{props.label}</span>
        </a>
    )
}

export default ProjectLink;