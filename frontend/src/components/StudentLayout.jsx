import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function StudentLayout() {
  return (
    <div>
      <nav className="top-nav">
        <NavLink to="/student/dashboard" className="nav-tab">Dashboard</NavLink>
        <NavLink to="/student/books" className="nav-tab">View Books</NavLink>
        <NavLink to="/student/search" className="nav-tab">Search Book</NavLink>
        <NavLink to="/student/borrow" className="nav-tab">Borrow Book</NavLink>
        <NavLink to="/student/return" className="nav-tab">Return Book</NavLink>
        <NavLink to="/student/fines" className="nav-tab">My Fines</NavLink>
      </nav>
      <Outlet />
    </div>
  )
}

export default StudentLayout