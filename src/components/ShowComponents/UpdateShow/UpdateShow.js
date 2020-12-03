import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { updateShow, viewShow } from '../../../api/auth'

const ShowUpdate = (props) => {
  const [show, setShow] = useState({ title: '', starring: '', director: '', description: '', released: '' })
  const [updated, setUpdated] = useState(false)
  const { msgAlert } = props
  useEffect(() => {
    viewShow(props.user, props.match.params.showId)
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
    updateShow(props.user, show, props.match.params.showId)
      .then(() => setUpdated(true))
      .then(() => {
        msgAlert({
          heading: 'Update Show Success',
          message: 'Nice job!',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Update Show Failed :(',
          message: 'Error code: ' + err.message,
          variant: 'danger'
        })
      })
      .catch(console.error)
  }

  if (updated) {
    return <Redirect to={`/shows/${props.match.params.showId}`} />
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
