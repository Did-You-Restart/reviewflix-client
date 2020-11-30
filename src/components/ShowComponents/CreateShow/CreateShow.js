import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
// import ShowForm from '../../../ShowForm'
// import Layout from '../../../Layout'

const ShowCreate = props => {
  const [show, setShow] = useState({ title: '', starring: '', director: '', description: '', released: '' })
  const [createdShowId, setCreatedShowId] = useState(null)
  const handleChange = event => {
    event.persist()
    setShow(prevShow => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedShow = Object.assign({}, prevShow, updatedField)
      return editedShow
    })
  }
  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/create-shows`,
      method: 'POST',
      data: { show }
    })

      .then(res => setCreatedShowId(res.data.show._id))
      .catch(console.error)
  }

  if (createdShowId) {
    return <Redirect to={`/shows/${createdShowId}`} />
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input
        placeholder="A Wonderful Movie"
        value={show.title}
        name="title"
        onChange={handleChange}
      />
      <label>Starring</label>
      <input
        placeholder="John Doe"
        value={show.starring}
        name="starring"
        onChange={handleChange}
      />
      <label>Director</label>
      <input
        placeholder="John Doe"
        value={show.director}
        name="director"
        onChange={handleChange}
      />
      <label>Description</label>
      <input
        placeholder="John Doe"
        value={show.description}
        name="description"
        onChange={handleChange}
      />
      <label>Released</label>
      <input
        placeholder="John Doe"
        value={show.released}
        name="released"
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
      <Link to={'create-shows/'}>
        <button>Cancel</button>
      </Link>
    </form>
  )
}

export default ShowCreate
