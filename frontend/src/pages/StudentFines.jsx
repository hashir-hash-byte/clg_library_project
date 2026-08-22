import React from 'react'

function StudentFines() {
  const fakeFines = [
    { bookTitle: 'Atomic Habits', overdueDays: 3, fine: 30 },
  ]

  return (
    <div className="content-page">
      <h2>My Fines</h2>
      {fakeFines.length === 0 ? (
        <p className="neo-message">✅ No Fines</p>
      ) : (
        <ul className="neo-list">
          {fakeFines.map((f, index) => (
            <li key={index}>
              {f.bookTitle} — Overdue by {f.overdueDays} day(s) — ₹{f.fine}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default StudentFines