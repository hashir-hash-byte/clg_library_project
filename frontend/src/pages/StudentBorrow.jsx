import React, { useState } from 'react'

function StudentBorrow() {
  const [bookId, setBookId] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!bookId) {
      setMessage('❌ Please enter a Book ID.')
      return
    }
    setMessage(`✅ Book ID ${bookId} borrowed (not yet saved to backend). Due in 14 days.`)
  }

  return (
    <div className="content-page">
      <h2>Borrow Book</h2>
      <form onSubmit={handleSubmit} className="neo-form">
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

export default StudentBorrow