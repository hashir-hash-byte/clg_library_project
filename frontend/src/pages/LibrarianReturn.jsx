import React, { useState } from 'react'

function LibrarianReturn() {
  const [studentId, setStudentId] = useState('')
  const [bookId, setBookId] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!studentId || !bookId) {
      setMessage('❌ Please enter both Student ID and Book ID.')
      return
    }
    setMessage(`✅ Book ID ${bookId} returned for Student ID ${studentId} (not yet saved).`)
  }

  return (
    <div className="content-page">
      <h2>Return Book</h2>
      <form onSubmit={handleSubmit} className="neo-form">
        <div>
          <label>Student ID</label>
          <input value={studentId} onChange={(e) => setStudentId(e.target.value)} />
        </div>
        <div>
          <label>Book ID</label>
          <input value={bookId} onChange={(e) => setBookId(e.target.value)} />
        </div>
        <button type="submit">Return</button>
      </form>
      {message && <p className="neo-message">{message}</p>}
    </div>
  )
}

export default LibrarianReturn