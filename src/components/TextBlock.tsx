import { styled } from "../../stitches.config";

const TextBlock = styled('span', {
  fontSize: '$2',
  fontFamily: '$text',
  fontWeight: '400',
  color: '#E4E4E4',
  lineHeight: '2.7rem',
  display: 'block',
  marginBottom: '$7',

  'strong': {
    fontFamily: 'Newsreader',
    fontStyle: 'italic',
    fontWeight: '400',
  },

  'a': {
    // fontFamily: 'Newsreader',
    // fontStyle: 'italic',
    // fontWeight: '400',
    textDecoration: 'underline',
    cursor: 'pointer',
  }
})

export default TextBlock;