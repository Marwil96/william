import React from "react";
import { Link } from "react-router-dom";
import './common.scss'

const selectNavOption = (path) => {
        if(path === '/lab') {
            return <Link to='/'>Home</Link> 
        } else if (path === '/') {
            return <span className='Header-logo' data-mouse-animation> Activate smoke machine </span>
        }
    }

const Header = (props) => {
    return (
        <div className="Header">
            <Link to='/' className='Header-logo'> William Martinsson </Link>

            {/* <a to='/' className='Header-logo' data-mouse-animation> Activate smoke machine </a> */}
            {selectNavOption(window.location.pathname)}
        </div>
    )
}

export default Header;