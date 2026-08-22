import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/login">Login</Link>
      <Link to="/student/dashboard">Student Dashboard</Link>
      <Link to="/librarian/dashboard">Librarian Dashboard</Link>
    </nav>
  )
}

export default Navbar