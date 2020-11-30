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
    // now we have to change this.setState to setBook
    setShow(prevShow => {
      const updatedField = { [event.target.name]: event.target.value }
      // now, instead of prevState.book, we can just use prevBook
      // const editedBook = Object.assign({}, prevState.book, updatedField)
      const editedShow = Object.assign({}, prevShow, updatedField)
      return editedShow
    })
  }
  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/create-shows`,
      method: 'POST',
      // now we want to update how we refer to the book data, by just sending book
      data: { show }
    })
      // now, instead of setState, we're going to use setCreatedId and pass the response as the createdBookId
      .then(res => setCreatedShowId(res.data.show._id))
      .catch(console.error)
  }
  // now, we get rid of the render function
  // then we get rid of the destructuring since we already have access to these
  // const { handleChange, handleSubmit } = this
  // const { createdBookId, book } = this.state
  // next step look for any this. we can find and get rid of those too

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
