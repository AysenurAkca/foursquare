import React from 'react'

export default function NotFound() {
  return (
    <div>
      <h1>Page could not be found</h1>
      <h4>We are sorry. But the page you are looking for is not available.You can go back to places page</h4>
      <a href="/places" className="notFoundLink">Go back to places</a>
    </div>
  )
}
