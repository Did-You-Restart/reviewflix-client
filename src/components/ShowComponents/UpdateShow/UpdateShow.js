import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'

const ShowUpdate = (props) => {
  const [show, setShow] = useState({ title: '', starring: '', director: '', description: '', released: '' })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/update-show/${props.match.params.id}`)
      .then(res => setShow(res.data.show))
      .catch(console.error)
  }, [])

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
      url: `${apiUrl}/shows/${props.match.params.id}`,
      method: 'PATCH',
      data: { show }
    })
      .then(() => setUpdated(true))
      .catch(console.error)
  }

  if (updated) {
    return <Redirect to={`/shows/${props.match.params.id}`} />
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
      <Link to={'update-show/'}>
        <button>Cancel</button>
      </Link>
    </form>
  )
}

export default ShowUpdate
