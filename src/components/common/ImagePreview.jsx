import React from "react";
import './common.scss'

const ImagePreview = (props) => {
    return (
        <img src={props.image} className="ImagePreview" data-previewImage />
    )
}

export default ImagePreview;