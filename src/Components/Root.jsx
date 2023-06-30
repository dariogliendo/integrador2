import React from 'react'
import { styled, keyframes } from 'styled-components'
import { Outlet, Link } from 'react-router-dom'

const MainContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`

const spin = keyframes`
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
`

const Navbar = styled.nav`
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
  }
`

const Content = styled.div`
  margin-top: 60px;
  padding: 16px;
  display: grid;
  place-content: center;
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

const Root = () => {
  return (
    <MainContainer>
      <Navbar>
        <Link to="/">
          <Brand>
            <img src="/logo.png" />
            <h2>FULBONEWS</h2>
          </Brand>
        </Link>
        <ul>
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
            <Link to="/contacto">
              <ContactButton>
                Contacto
              </ContactButton>
            </Link>
          </li>
        </ul>
      </Navbar>
      <Content>
        <Outlet />
      </Content>
    </MainContainer>
  )
}

export default Root