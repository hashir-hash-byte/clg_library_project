import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function LibrarianLayout() {
  return (
    <div>
      <nav className="top-nav">
        <NavLink to="/librarian/dashboard" className="nav-tab">Dashboard</NavLink>
        <NavLink to="/librarian/books" className="nav-tab">View Books</NavLink>
        <NavLink to="/librarian/search" className="nav-tab">Search Book</NavLink>
        <NavLink to="/librarian/add-book" className="nav-tab">Add Book</NavLink>
        <NavLink to="/librarian/delete-book" className="nav-tab">Delete Book</NavLink>
        <NavLink to="/librarian/register-student" className="nav-tab">Register Student</NavLink>
        <NavLink to="/librarian/delete-student" className="nav-tab">Delete Student</NavLink>
        <NavLink to="/librarian/borrow" className="nav-tab">Borrow Book</NavLink>
        <NavLink to="/librarian/return" className="nav-tab">Return Book</NavLink>
        <NavLink to="/librarian/fines" className="nav-tab">Calculate Fine</NavLink>
      </nav>
      <Outlet />
    </div>
  )
}

export default LibrarianLayout