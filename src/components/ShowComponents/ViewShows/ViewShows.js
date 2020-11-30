import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../../apiConfig'

const viewShows = props => {
  const [showArray, setShowArray] = useState(null)

  const handleSubmit = (event, show) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/shows`,
      method: 'GET',
      data: { show }
    })
      .then(res => setShowArray({ showArray: res.data.shows }))
      .catch(console.error)
  }

  if (!showArray) {
    return ('loading...')
  } else
  
  return (
    <div>
      {showArray.map(show => (
        <div key='shows-list'
          onChange={handleSubmit}>
          <h2>{show.title}</h2>
          <Link to={`/view-shows/${show._id}`}>Link</Link>
        </div>
      ))}
    </div>

  )
}

export default viewShows
