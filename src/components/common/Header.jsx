import React from "react";
import { Link } from "react-router-dom";
import './common.scss'

// const selectNavOption = (path) => {
//         if(path === '/lab') {
//             return <Link to='/'>Home</Link> 
//         } else {
//             return <Link to='/lab'>Lab</Link>
//         }
//     }

const Header = (props) => {
    return (
        <div className="Header">
            <Link to='/' className='Header-logo'> William Martinsson </Link>
            {/* {selectNavOption(window.location.pathname)} */}
        </div>
    )
}

export default Header;