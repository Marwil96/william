import React from "react";
import './common.scss'

const TextBlockHorizontal = (props) => {
  return (
    <div className='TextBlockHorizontal'>
        <span className='TextBlockHorizontal-label'>{props.label}</span>
        <span className='TextBlockHorizontal-text'>{props.text}</span>
    </div>
  )
}

export default TextBlockHorizontal;