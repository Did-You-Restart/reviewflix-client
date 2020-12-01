import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { viewShows } from '../../../api/auth'

const ViewShows = props => {
  const [showArray, setShowArray] = useState(null)

  useEffect(() => {
    viewShows()
      .then(res => {
        console.log(res)
        setShowArray(res.data.shows)
      })
      .catch(console.error)
  }, [])

  if (!showArray) {
    return ('loading...')
  } else {
    return (
      <div>
        {showArray.map(show => (
          <div key={show._id}>
            <h2>{show.title}</h2>
            <Link to={`/shows/${show._id}`}>Link</Link>
          </div>
        ))}
      </div>

    )
  }
}

export default ViewShows
