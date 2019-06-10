import React from "react";
import './common.scss'

const ImagePreview = (props) => {
    return (
        <img alt='' src={props.image} className="ImagePreview" data-preview-image />
    )
}

export default ImagePreview;