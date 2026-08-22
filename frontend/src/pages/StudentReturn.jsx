import React, { useState } from 'react'
import { returnBook } from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'

function StudentReturn() {
  const [bookId, setBookId] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    if (!bookId) {
      setMessage('❌ Please enter a Book ID.')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const data = await returnBook(user.studentId, Number(bookId))
      console.log('Return response:', data) // TEMPORARY: check real shape here

      setMessage(`✅ Book ID ${bookId} returned successfully.`)
      setBookId('')
    } catch (err) {
      setMessage('❌ Failed to return book. Please check the Book ID and try again.')
      console.log('Return error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="content-page">
      <h2>Return Book</h2>
      <form onSubmit={handleSubmit} className="neo-form">
        <div>
          <label>Book ID</label>
          <input value={bookId} onChange={(e) => setBookId(e.target.value)} />
        </div>
        {message && <p className="neo-message">{message}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Returning...' : 'Return'}
        </button>
      </form>
    </div>
  )
}

export default StudentReturn