import React from 'react'
import { Link, useRouteError } from 'react-router-dom'

const NotFound = () => {
  const error=useRouteError()
  
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
    <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
    <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
    <p className="text-gray-600 mb-6">Sorry, the page you're looking for doesn't exist.</p>
    <p className="text-gray-600 mb-6">{error.data}</p>
    <Link to="/"className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
      Go Back Home
    </Link>
  </div>
    </div>
  )
}

export default NotFound