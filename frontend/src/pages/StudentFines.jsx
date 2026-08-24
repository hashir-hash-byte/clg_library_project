import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { getStudentFines } from '../services/api.js'

function StudentFines() {
  const { user } = useAuth()
  const [finesData, setFinesData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchFines() {
      try {
        const data = await getStudentFines(user?.studentId)
        console.log('Fines response:', data) // TEMPORARY: check real shape here
        setFinesData(data)
      } catch (err) {
        setError('Failed to load fines.')
        console.log('Get fines error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchFines()
  }, [user])

  if (loading) return <div className="content-page"><p className="neo-message">Loading fines...</p></div>
  if (error) return <div className="content-page"><p className="neo-message">{error}</p></div>

  const fines = finesData?.fines ?? []

  return (
    <div className="content-page">
      <h2>My Fines</h2>

      {finesData && (
        <p className="neo-message">
          {finesData.student_name} — Total Fine: ₹{finesData.total_fine}
        </p>
      )}

      {fines.length === 0 ? (
        <p className="neo-message">✅ No Fines</p>
      ) : (
        <div className="neo-table-wrap">
          <table className="neo-table">
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Book ID</th>
                <th>Due Date</th>
                <th>Return Date</th>
                <th>Status</th>
                <th>Overdue Days</th>
                <th>Fine (₹)</th>
              </tr>
            </thead>
            <tbody>
              {fines.map((f) => (
                <tr key={f.borrow_id}>
                  <td>{f.book_title}</td>
                  <td>{f.book_id}</td>
                  <td>{f.due_date}</td>
                  <td>{f.return_date ?? 'Not returned'}</td>
                  <td>
                    <span className={`neo-badge ${f.return_date ? 'available' : 'unavailable'}`}>
                      {f.status}
                    </span>
                  </td>
                  <td>{f.overdue_days}</td>
                  <td>{f.fine_amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default StudentFines