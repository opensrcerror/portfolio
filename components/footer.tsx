import React from 'react'

export default function Footer() {
  return (
    <footer className="mb-10 px-4 text-center text-gray-500">
      <small>
        &copy; {new Date().getFullYear()} ~ OpenSourceErr.
      </small>
    </footer>
  )
}
