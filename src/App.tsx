import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import AbsencesPage from './pages/AbsencesPage'
import EmployeePage from './pages/EmployeePage'

// Responsive container with margins
const AppContainer = styled.div`
  margin: 50px;
  color: orange;
  font-family: Arial, sans-serif;

  @media (min-width: 1024px) {
    margin: 200px;
  }
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const Title = styled.h1`
  font-size: 2rem;
  color: orange;
`

const NavLink = styled(Link)`
  font-size: 1rem;
  color: orange;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const Main = styled.main`
  min-height: 60vh;
`

const Footer = styled.footer`
  margin-top: 2rem;
  font-size: 0.9rem;
  color: orange;
  text-align: center;
`

export default function App(){
  return (
    <AppContainer>
      <Header>
        <Title>BrightHR — Absences</Title>
        <nav>
          <NavLink to="/">All absences</NavLink>
        </nav>
      </Header>

      <Main>
        <Routes>
          <Route path="/" element={<AbsencesPage />} />
          <Route path="/employee/:id" element={<EmployeePage />} />
        </Routes>
      </Main>

      <Footer>Tech test</Footer>
    </AppContainer>
  )
}
