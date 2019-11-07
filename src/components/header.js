import { navigate } from "gatsby"
import React, {useEffect} from "react"

const Header = () => {

  useEffect(() => {
    document.querySelector('.header').classList.add('header__animated')
  }, []);

  const clickEventHandler = () => {
    if(window.location.pathname.split('/')[1] === 'projects' & window.location.pathname.split('/').length > 2) {
      document.querySelector('.pageheader').classList.remove('pageheader__animated');

      setTimeout(() => {
        navigate('/')
      },1000
    );
    } else {
      navigate('/')
    }
  }

  return (
    <header className='header'>
      <span onClick={clickEventHandler} className='header__logo'>william martinsson</span>
    </header>
  )
}

export default Header
