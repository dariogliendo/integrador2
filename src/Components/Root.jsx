import React from 'react'
import { styled } from 'styled-components'
import { Outlet } from 'react-router-dom'
import deviceBreakpoints from '../utils/mediaQueryBreakpoints'
import Navbar from './Navbar'

const MainContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  display: grid;
  place-content: center;
  max-width: 70vw;
  margin: auto;
  margin-top: 80px;

  @media ${deviceBreakpoints.mobileM} {
    max-width: 100vw;
  }
`

const Root = () => {
  return (
    <MainContainer>
      <Navbar/>
      <Content>
        <Outlet />
      </Content>
    </MainContainer>
  )
}

export default Root