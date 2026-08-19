import React, { useState } from 'react'

function LibrarianFines() {
  const [studentId, setStudentId] = useState('')
  const [bookId, setBookId] = useState('')
  const [result, setResult] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!studentId || !bookId) {
      setResult('❌ Please enter both Student ID and Book ID.')
      return
    }
    setResult('⚠️ Overdue by 3 day(s) — Fine Amount: ₹30 (fake data)')
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
        <button type="submit">Calculate</button>
      </form>
      {result && <p className="neo-message">{result}</p>}
    </div>
  )
}

export default LibrarianFines