import React from 'react'
import books from '../mock/books.js'

function LibrarianBooks() {
  return (
    <div className="content-page">
      <h2>All Books</h2>
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

export default LibrarianBooks