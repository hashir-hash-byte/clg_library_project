import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { getReports } from '../services/api.js'

function StudentDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchReports() {
      try {
        const data = await getReports()
        console.log('Reports response:', data) // TEMPORARY: check real shape here
        setStats(data.reports)
      } catch (err) {
        setError('Failed to load dashboard data.')
        console.log('Get reports error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  return (
    <div className="reports-page">
      <div className="dashboard-container">
        <div className="welcome-strip">
          <h1 className="welcome-heading">Welcome, {user?.fullName}!</h1>
        </div>

        {loading && <p>Loading dashboard...</p>}
        {error && <p className="neo-message">{error}</p>}

        {!loading && !error && stats && (
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-label">Total Books</div>
              <div className="stat-value">{stats.total_books}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Total Students</div>
              <div className="stat-value">{stats.total_students}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Borrowed Books</div>
              <div className="stat-value">{stats.borrowed_books}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Returned Books</div>
              <div className="stat-value">{stats.returned_books}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Available Copies</div>
              <div className="stat-value">{stats.available_copies}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Overdue Books</div>
              <div className="stat-value">{stats.overdue_books}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentDashboard