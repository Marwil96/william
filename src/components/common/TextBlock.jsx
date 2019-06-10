import React from "react";
import './common.scss'

const TextBlock = (props) => {
  return (
    <div className='TextBlock'>
        <span className='TextBlock-label'>{props.label}</span>
        <span className='TextBlock-text'>{props.text}</span>
    </div>
  )
}

export default TextBlock;