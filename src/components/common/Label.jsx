import React from "react";
import styling from './common.scss'

const Label = (props) => {
  return (
   <span className="Label">{props.label}</span>
  )
}

export default Label;