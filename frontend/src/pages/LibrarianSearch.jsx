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
      console.log('Search response:', data) // TEMPORARY: check real shape here
      setResults(data)
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
        {results.map((book) => (
          <li key={book.book_id}>
            {book.title} by {book.author_name} —{' '}
            {book.available_copies > 0 ? 'Available' : 'Checked out'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LibrarianSearch