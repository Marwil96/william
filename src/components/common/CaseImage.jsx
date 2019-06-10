import React from "react";
import './common.scss'

import ImageLoader from './ImageLoader'

import LazyLoad from 'react-lazy-load';

const CaseImage = (props) => {
    return (
        <LazyLoad
        debounce={false}
        offsetVertical={500}
        throttle={250}
        >
            <div className="CaseImage" style={{paddingBottom:props.aspectRatio}}>
                {/* <img src={props.image} className="CaseImage-image" /> */}
                <ImageLoader src={props.image} className="CaseImage-image" />
            </div>
        </LazyLoad>
    )   
}

export default CaseImage;