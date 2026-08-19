import React from 'react'
import books from '../mock/books.js'

function StudentViewBooks() {
  return (
    <div className="content-page">
      <h2>Available Books</h2>
      <ul className="neo-list">
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author} —{' '}
            {book.available ? 'Available' : 'Checked out'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StudentViewBooks