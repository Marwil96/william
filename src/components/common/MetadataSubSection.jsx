import React from "react";
import './common.scss'

const MetadataSubSection = (props) => {
  return (
    <div className='MetadataSubSection'>
        <span className='MetadataSubSection-label'>{props.label}</span>
        <span className='MetadataSubSection-title'>{props.title}</span>
    </div>
  )
}

export default MetadataSubSection;