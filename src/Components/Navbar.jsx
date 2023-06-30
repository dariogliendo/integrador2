import React, { useState } from 'react'
import { styled, keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import deviceBreakpoints from '../utils/mediaQueryBreakpoints'

const Navbar = () => {
  const [showSideMenu, setShowSideMenu] = useState(false)

  // Métodos
  function handleBurgerClick() {
    setShowSideMenu(!showSideMenu)
  }

  const TopNavbar = styled.nav`
  width: 100%;
  display: flex;
  position: fixed;
  background: white;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  padding: 8px 16px;
  background-color: #F18F01;
  z-index: 10;

  @media ${deviceBreakpoints.mobileM} {
    justify-content: space-between;
  }
  
  a {
    color: black;
    text-decoration: none;
    transition: font-weight 0.2s ease;

    &:hover {
      font-weight: 700;
    }
  }

  ul {
    display: flex;
    flex-direction: row;
    gap: 15px;
    list-style: none;
    padding: 0;
    justify-content: center;
    flex: 1;

    @media ${deviceBreakpoints.mobileM} {
      display: none;
    }
  }
  `

  const spin = keyframes`
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
  `

  const Brand = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;

  h2 {
    margin: 0;
  }

  &:hover {
    img {
      animation-name: ${spin};
      animation-duration: 1s;
      animation-iteration-count: infinite;
    }
  }

  img {
    width: 40px;
    height: 40px;
  }
  `

  const ContactButton = styled.button`
  appearance: none;
  border: none;
  background-color: #F2550C;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s linear;

  &:hover {
    background-color: #D94C0B;
    transform: scale(1.1)
  }
  `

  const sideEnter = keyframes`
    0% {
      transform: translateX(100vw);
    }
    100% {
      transform: translateX(0vw);
    }
  `

  const SideMenu = styled.div`
    display: flex;
    flex-direction: column;
    background: #F18F01;
    position: absolute;
    right: 0;
    top: 0;
    height: 100vh;
    width: 80vw;
    box-shadow: -4px 1px 5px 0px rgba(0,0,0,0.49);
    -webkit-box-shadow: -4px 1px 5px 0px rgba(0,0,0,0.49);
    -moz-box-shadow: -4px 1px 5px 0px rgba(0,0,0,0.49);

    &.active {
      animation-name: ${sideEnter};
      animation-duration: 0.3s;
    }

    .topRow {
      height: 60px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      padding: 15px;
    }

    ul {
      @media ${deviceBreakpoints.mobileM} {
        display: flex;
        flex-direction: column;
        align-self: flex-end;
        justify-content: flex-start;
        padding-right: 15px;
        text-align: right;
      }
    }
  `

  const Burger = styled.div`
    @media ${deviceBreakpoints.desktopL} {
      display: none;
    }
  `

  const LinkList = <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/primera">Primera División</Link>
    </li>
    <li>
      <Link to="/copa-argentina">Copa Argentina</Link>
    </li>
    <li>
      <Link to="/internacional">Internacional</Link>
    </li>
    <li>
      <Link to="/libertadores">Copa Libertadores</Link>
    </li>
    <li>
      <Link to="/basquet">Básquet</Link>
    </li>
    <li>
      <Link to="/boxeo">Boxeo</Link>
    </li>
    <li>
      <Link to="/favoritos">Favoritos</Link>
    </li>
    <li>
      <Link to="/contacto">
        <ContactButton>
          Contacto
        </ContactButton>
      </Link>
    </li>
  </ul>

  return (
    <TopNavbar>
      <Link to="/">
        <Brand>
          <img src="/logo.png" />
          <h2>FULBONEWS</h2>
        </Brand>
      </Link>
      <Burger onClick={handleBurgerClick}>
        <FontAwesomeIcon icon={faBars} />
      </Burger>
      {LinkList}
      {
        showSideMenu
        ?
          <SideMenu className={showSideMenu ? 'active' : ''}>
            <div class="topRow">
              <Burger onClick={handleBurgerClick}>
                <FontAwesomeIcon icon={faBars} />
              </Burger>
            </div>
            {LinkList}
          </SideMenu>
        : ''
      }
    </TopNavbar>
  )
}

export default Navbar