import React, { useState, useEffect } from 'react'

function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <button className="neo-theme-toggle" onClick={toggleTheme}>
      Theme
    </button>
  )
}

export default ThemeToggle