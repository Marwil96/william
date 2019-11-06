import React from "react"

const Footer = () => (
  <footer className='footer'>
    {/* <h5 className="Label">How to find me.</h5> */}
    <a href='mailto:marwil1996@gmail.com' rel="noopener noreferrer" target="_blank" className='projectlink'>
      <h3 className='projectlink__title'>Mail</h3>
      <span className='projectlink__category'>Talk to me or exchange doggopics both works great.</span>
    </a>

    <a href='https://www.github.com/marwil96' rel="noopener noreferrer" target="_blank" className='projectlink'>
      <h3 className='projectlink__title'>Github</h3>
      <span className='projectlink__category'>If you want to see my code.</span>
    </a>

    <a href='https://linkedin.com/in/william-martinsson-a24a3b111' rel="noopener noreferrer" target="_blank" className='projectlink'>
      <h3 className='projectlink__title'>Linkedin</h3>
      <span className='projectlink__category'>Ehrm, connect with me?</span>
    </a>

    <a href='https://medium.com/@marwil1996' rel="noopener noreferrer" target="_blank" className='projectlink'>
      <h3 className='projectlink__title'>Medium</h3>
      <span className='projectlink__category'>If you want to see my unpublished articles.</span>
    </a>
  </footer>
)

export default Footer
