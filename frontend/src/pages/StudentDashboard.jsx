import React from 'react'

function StudentDashboard() {
  const borrowedBookIds = '12, 27'
  const fine = 30
  const returnedBooks = 'Clean Code'

  return (
    <div className="reports-page">
      <div className="dashboard-container">
        <h2>Student Dashboard</h2>
        <div className="stats-grid student-grid">
          <div className="stat-box">
            <div className="stat-label">Borrowed Book IDs</div>
            <div className="stat-value">{borrowedBookIds}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Fine</div>
            <div className="stat-value">₹{fine}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Returned Books</div>
            <div className="stat-value">{returnedBooks}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard