import React, { useState } from 'react'
import books from '../mock/books.js'

function StudentSearch() {
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState([])
  const [searched, setSearched] = useState(false)

  function handleSearch(e) {
    e.preventDefault()
    const matches = books.filter((book) =>
      book.title.toLowerCase().includes(keyword.toLowerCase())
    )
    setResults(matches)
    setSearched(true)
  }

  return (
    <div className="content-page">
      <h2>Search Book</h2>
      <form onSubmit={handleSearch} className="neo-input-wrap">
        <input
          className="neo-input"
          placeholder="Search by title..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <span className="neo-input-icon">🔍</span>
      </form>

      {searched && results.length === 0 && (
        <p className="neo-message">No books found.</p>
      )}

      <ul className="neo-list">
        {results.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author} —{' '}
            {book.available ? 'Available' : 'Checked out'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StudentSearch