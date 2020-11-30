import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../../apiConfig'

const viewShows = props => {
<<<<<<< HEAD
  const [show] = useState({ title: '' })

  const handleSubmit = (event) => {
=======
  const [showArray, setShowArray] = useState(null)

  const handleSubmit = (event, show) => {
>>>>>>> 2bd4ac5c7046cb808ffbb52aa11e369018a435b8
    event.preventDefault()
    axios({
      url: `${apiUrl}/shows`,
      method: 'GET',
      data: { show }
    })
<<<<<<< HEAD
      .then(res => this.setState({ showArray: res.data.shows }))
      .catch(console.error)
  }

  return (
    <div>
      {this.state.showArray.map(show => (
=======
      .then(res => setShowArray({ showArray: res.data.shows }))
      .catch(console.error)
  }

  if (!showArray) {
    return ('loading...')
  } else
  
  return (
    <div>
      {showArray.map(show => (
>>>>>>> 2bd4ac5c7046cb808ffbb52aa11e369018a435b8
        <div key='shows-list'
          onChange={handleSubmit}>
          <h2>{show.title}</h2>
          <Link to={`/view-shows/${show._id}`}>Link</Link>
        </div>
      ))}
    </div>
<<<<<<< HEAD
=======

>>>>>>> 2bd4ac5c7046cb808ffbb52aa11e369018a435b8
  )
}

export default viewShows
