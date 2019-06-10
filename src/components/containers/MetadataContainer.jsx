import React from "react";
import { MetadataSubSection } from '../common'

import  './containers.scss'

const MetadataContainer = (props) => {
  return (
    <div className='MetadataContainer'>
        {props.data.map((subsection, index) => {
           return (<MetadataSubSection key={index} label={subsection.label} title={subsection.title}/> )
        })}
    </div>
  )
}

export default MetadataContainer;