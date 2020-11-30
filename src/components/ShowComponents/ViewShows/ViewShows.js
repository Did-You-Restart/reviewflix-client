import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../../apiConfig'

const viewShows = props => {
  const [show] = useState({ title: '' })

  const handleSubmit = (event) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/shows`,
      method: 'GET',
      data: { show }
    })
      .then(res => this.setState({ showArray: res.data.shows }))
      .catch(console.error)
  }

  return (
    <div>
      {this.state.showArray.map(show => (
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
