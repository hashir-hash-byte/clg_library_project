import React, { useState } from 'react'
import { borrowBook } from '../services/api.js'

function LibrarianBorrow() {
  const [studentId, setStudentId] = useState('')
  const [bookId, setBookId] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!studentId || !bookId) {
      setMessage('❌ Please enter both Student ID and Book ID.')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const data = await borrowBook(Number(studentId), Number(bookId))
      console.log('Borrow response:', data) // TEMPORARY: check real shape here

      setMessage(`✅ Book ID ${bookId} borrowed for Student ID ${studentId}.`)
      setStudentId('')
      setBookId('')
    } catch (err) {
      setMessage('❌ Failed to borrow book. Please check the IDs and try again.')
      console.log('Borrow error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="content-page">
      <h2>Borrow Book</h2>
      <form onSubmit={handleSubmit} className="neo-form">
        <div>
          <label>Student ID</label>
          <input value={studentId} onChange={(e) => setStudentId(e.target.value)} />
        </div>
        <div>
          <label>Book ID</label>
          <input value={bookId} onChange={(e) => setBookId(e.target.value)} />
        </div>
        {message && <p className="neo-message">{message}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Borrowing...' : 'Borrow'}
        </button>
      </form>
    </div>
  )
}

export default LibrarianBorrow