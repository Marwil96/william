import React from 'react';
import Image from 'next/image';
import { styled } from '../../stitches.config';

const ImageContainer = styled('div', {
  position: 'relative',
  width: '100%',
  // minHeight: '48.2rem',
  padding: '$4 0',
  maxWidth: '79.2rem',

  'img': {
    borderRadius: '1.2rem'
  }
})

const ComposedImage = ({image}) => (
  <ImageContainer>
    <Image src={image} alt='mockup 1' layout='intrinsic' objectFit='contain' placeholder="blur" blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=' />
  </ImageContainer>
)

export default ComposedImage;