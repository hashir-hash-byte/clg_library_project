import React from 'react'

function LibrarianDashboard() {
  const stats = {
    totalBooks: 120,
    totalStudents: 45,
    borrowedBooks: 18,
    returnedBooks: 90,
    availableCopies: 102,
    overdueBooks: 4,
  }

  return (
    <div className="reports-page">
      <div className="dashboard-container">
        <h2>Librarian Dashboard</h2>
        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-label">Total Books</div>
            <div className="stat-value">{stats.totalBooks}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Total Students</div>
            <div className="stat-value">{stats.totalStudents}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Borrowed Books</div>
            <div className="stat-value">{stats.borrowedBooks}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Returned Books</div>
            <div className="stat-value">{stats.returnedBooks}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Available Copies</div>
            <div className="stat-value">{stats.availableCopies}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Overdue Books</div>
            <div className="stat-value">{stats.overdueBooks}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LibrarianDashboard