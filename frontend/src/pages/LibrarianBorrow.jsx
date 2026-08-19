import React, { useState } from 'react'

function LibrarianBorrow() {
  const [studentId, setStudentId] = useState('')
  const [bookId, setBookId] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!studentId || !bookId) {
      setMessage('❌ Please enter both Student ID and Book ID.')
      return
    }
    setMessage(`✅ Book ID ${bookId} borrowed for Student ID ${studentId} (not yet saved). Due in 14 days.`)
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
        <button type="submit">Borrow</button>
      </form>
      {message && <p className="neo-message">{message}</p>}
    </div>
  )
}

export default LibrarianBorrow