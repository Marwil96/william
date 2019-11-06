import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, {useEffect} from "react"

const Header = () => {

  useEffect(() => {
    document.querySelector('.header').classList.add('header__animated')
  }, []);

  return (
    <header className='header'>
      <Link to='/' className='header__logo'>william martinsson</Link>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
