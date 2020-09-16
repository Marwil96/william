import React, {useState} from 'react'
import { Link } from 'gatsby';
import { breakpoint } from "../mixins/breakpoint"
import styled from 'styled-components';
import Button from './Button';
import MobileMenu from './MobileMenu';
import Anime from 'react-anime';

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  max-width: 119rem;
  padding-top: 4.6rem;
  align-items: center;
  position: absolute;
  z-index: 100;

  .LinkContainer {
    display: flex;
    a {
      margin-right: 2.4rem;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  svg {
    width: 2.2rem;
    display: none;

    ${breakpoint.phone`
      display: block;
    `}
  }

  ${breakpoint.phone`
    width: calc(100% - 3.2rem);
    padding-left: 1.6rem;
    padding-right: 1.6rem;
    
    .link {
      display: none;
    }

    .name { 
      display: block;
    }
  `}
`

const LinkItem = styled.span`
  font-size: 2rem;
  font-weight: 500;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid #333;
  display: inline-table;
  cursor: pointer;
  position: relative;

  position: relative;
  display: inline-block;
  padding-top: 0.2em;
  padding-right: 0.05em;
  padding-bottom: 0.1em;
  overflow: hidden;

  .letter0 {
    transform-origin: 0 100%;
    display: inline-block;
    line-height: 1em;
    min-width: 4px;
  }

  .letters {
    display: flex;
  }

  ${breakpoint.phone`
    font-weight: 400;
  `}
`
const name = 'William Martinsson';

console.log(window.location.pathname)
const animeProps = {
  translateY: ["1.1em", 0],
  translateX: ["0.55em", 0],
  translateZ: 0,
  rotateZ: [180, 0],
  // duration: 750,
  easing: "easeOutExpo",
  // delay: (el, i) => i * 150,
}

const Header = () => {
  const [menuActive, setMenuActive] = useState(false)

  return (
    <HeaderWrapper>
      <Link to="/" className="name">
        <LinkItem>
          <span className="letters">
            {Array.from(name).map((character, index) => (
              <Anime
                {...animeProps}
                delay={50 * index}
                duration={window.location.pathname === "/" ? 750 : "0"}
                className="letter"
                key={index}
              >{`${character}`}</Anime>
            ))}
          </span>
        </LinkItem>
      </Link>
      <div className='LinkContainer'>
        <Link className="link" to="/work">
          <LinkItem>Work</LinkItem>
        </Link>

        <Link className="link" to="/services">
          <LinkItem>Services</LinkItem>
        </Link>
      </div>
      <Link className="link" to="/contact">
        <Button>Let’s work together</Button>
      </Link>
      <svg
        onClick={() => setMenuActive(true)}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 12"
      >
        <path
          d="M0 11h16M0 1h16H0zm0 5h16H0z"
          stroke="#333"
          strokeWidth="1.4"
          strokeMiterlimit="10"
        />
      </svg>
      <MobileMenu menuActive={menuActive} closeMenu={setMenuActive} />
    </HeaderWrapper>
  )
}

export default Header;