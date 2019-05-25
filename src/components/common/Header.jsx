import React from "react";

import styling from './common.scss'

const selectNavOption = (path) => {
        if(path == '/lab') {
            return <a href="/">Home</a>  
        } else {
            return <a href="/lab">Lab</a>
        }
    }

const Header = (props) => {
    return (
        <div className="Header">
            <span> William Martinsson </span>
            {selectNavOption(props.path)}
        </div>
    )
}

export default Header;