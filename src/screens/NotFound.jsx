import React from 'react'
import { Link } from 'react-router-dom'
import { PATH_HOME } from '../routes'

function NotFound() {
  return (
    <div>
      <h1 className="text-warning">404 : Not Found!</h1>
      <Link exact="true" to={PATH_HOME} className="inline-block mt-8 link">
        Go Home
      </Link>
    </div>
  )
}

export default NotFound
