import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import AbsencesPage from './pages/AbsencesPage'
import EmployeePage from './pages/EmployeePage'

export default function App(){
  return (
    <div className="app">
      <header className="header">
        <h1 className="title">BrightHR — Absences</h1>
        <nav><Link to="/" className="navlink">All absences</Link></nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<AbsencesPage />} />
          <Route path="/employee/:id" element={<EmployeePage />} />
        </Routes>
      </main>
      <footer className="footer">Tech test</footer>
    </div>
  )
}
