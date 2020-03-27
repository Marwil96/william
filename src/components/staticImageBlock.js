import React from 'react';
import { StaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image';

const StaticImageBlock = ({id, active}) => {
  return (
    <StaticQuery query={graphql`
  {
    allImageSharp {
      nodes {
        fluid(quality: 100) {
          base64
          tracedSVG
          srcWebp
          srcSetWebp
          originalImg
          originalName
          presentationWidth
          presentationHeight
          sizes
          src
          srcSet
        }
        resize {
          originalName
          src
        }
      }
    }
   }
`} render={data => {
  const image = data.allImageSharp.nodes.filter(item => item.resize.originalName === id);
   return (
     <div className={active ? 'homepage__imageblock active' : 'homepage__imageblock'}>{image[0] !== undefined ? <Img alt='displays images when hovering over text' fluid={image[0].fluid} /> : ''}</div>
   )
  }} />
  )
}


export default StaticImageBlock;