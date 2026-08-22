import React, { useState } from 'react'
import { searchBooks } from '../services/api.js'

function LibrarianSearch() {
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSearch(e) {
    e.preventDefault()

    setLoading(true)
    setError('')

    try {
      const data = await searchBooks(keyword)
      console.log('Search response (raw):', data)
      console.log('Is it an array?', Array.isArray(data))

      // DEFENSIVE: handle a few possible real shapes without crashing
      let bookList = []
      if (Array.isArray(data)) {
        bookList = data
      } else if (data && Array.isArray(data.books)) {
        bookList = data.books
      } else if (data && Array.isArray(data.results)) {
        bookList = data.results
      } else {
        console.log('Unexpected response shape, showing nothing.')
      }

      setResults(bookList)
      setSearched(true)
    } catch (err) {
      setError('Search failed. Please try again.')
      console.log('Search error:', err)
    } finally {
      setLoading(false)
    }
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

      {loading && <p className="neo-message">Searching...</p>}
      {error && <p className="neo-message">{error}</p>}
      {searched && !loading && results.length === 0 && (
        <p className="neo-message">No books found.</p>
      )}

      <ul className="neo-list">
        {results.map((book, index) => (
          <li key={book.book_id ?? book.id ?? index}>
            {book.title ?? 'Untitled'} by {book.author_name ?? book.author ?? 'Unknown'} —{' '}
            {(book.available_copies ?? 0) > 0 ? 'Available' : 'Checked out'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LibrarianSearch