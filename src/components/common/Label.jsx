import React from "react";
import './common.scss'

const Label = (props) => {
  return (
   <span className="Label" style={{color: props.color}}>{props.label}</span>
  )
}

export default Label;