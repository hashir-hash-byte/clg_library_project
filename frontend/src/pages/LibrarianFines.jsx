import React, { useState } from 'react'
import { calculateFine } from '../services/api.js'

function LibrarianFines() {
  const [studentId, setStudentId] = useState('')
  const [bookId, setBookId] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!studentId || !bookId) {
      setResult('❌ Please enter both Student ID and Book ID.')
      return
    }

    setLoading(true)
    setResult('')

    try {
      const data = await calculateFine(Number(studentId), Number(bookId))
      console.log('Fine response:', data) // TEMPORARY: check real shape here

      setResult(`⚠️ Overdue by ${data.overdue_days} day(s) — Fine Amount: ₹${data.fine_amount}`)
    } catch (err) {
      setResult('❌ Failed to calculate fine. Please check the IDs and try again.')
      console.log('Fine error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="content-page">
      <h2>Calculate Fine</h2>
      <form onSubmit={handleSubmit} className="neo-form">
        <div>
          <label>Student ID</label>
          <input value={studentId} onChange={(e) => setStudentId(e.target.value)} />
        </div>
        <div>
          <label>Book ID</label>
          <input value={bookId} onChange={(e) => setBookId(e.target.value)} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate'}
        </button>
      </form>
      {result && <p className="neo-message">{result}</p>}
    </div>
  )
}

export default LibrarianFines