import React from 'react';
import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image';

const StaticImageBlock = ({id, active}) => {
  const data = useStaticQuery(graphql`
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
 `)

  const image = data.allImageSharp.nodes.filter(item => item.resize.originalName === id);

  return (
    <div className={active ? 'homepage__imageblock active' : 'homepage__imageblock'}>{image[0] !== undefined ? <Img alt='displays images when hovering over text' fluid={image[0].fluid} /> : ''}</div>
    // <img className={active ? 'homepage__imageblock active' : 'homepage__imageblock'} src={image[0] !== undefined ? image[0].resize.src : ''} alt='displays images when hovering over text' />
  )
}

export default StaticImageBlock;