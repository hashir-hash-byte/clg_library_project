import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import StudentLayout from './components/StudentLayout.jsx'
import LibrarianLayout from './components/LibrarianLayout.jsx'

import StudentDashboard from './pages/StudentDashboard.jsx'
import StudentSearch from './pages/StudentSearch.jsx'
import StudentBorrow from './pages/StudentBorrow.jsx'
import StudentReturn from './pages/StudentReturn.jsx'
import StudentFines from './pages/StudentFines.jsx'
import StudentViewBooks from './pages/StudentViewBooks.jsx'

import LibrarianDashboard from './pages/LibrarianDashboard.jsx'
import LibrarianBooks from './pages/LibrarianBooks.jsx'
import LibrarianSearch from './pages/LibrarianSearch.jsx'
import AddBook from './pages/AddBook.jsx'
import RegisterStudent from './pages/RegisterStudent.jsx'
import LibrarianBorrow from './pages/LibrarianBorrow.jsx'
import LibrarianReturn from './pages/LibrarianReturn.jsx'
import LibrarianFines from './pages/LibrarianFines.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="search" element={<StudentSearch />} />
          <Route path="borrow" element={<StudentBorrow />} />
          <Route path="return" element={<StudentReturn />} />
          <Route path="fines" element={<StudentFines />} />
          <Route path="books" element={<StudentViewBooks />} />
        </Route>

        <Route
          path="/librarian"
          element={
            <ProtectedRoute allowedRole="librarian">
              <LibrarianLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<LibrarianDashboard />} />
          <Route path="books" element={<LibrarianBooks />} />
          <Route path="search" element={<LibrarianSearch />} />
          <Route path="add-book" element={<AddBook />} />
          <Route path="register-student" element={<RegisterStudent />} />
          <Route path="borrow" element={<LibrarianBorrow />} />
          <Route path="return" element={<LibrarianReturn />} />
          <Route path="fines" element={<LibrarianFines />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App