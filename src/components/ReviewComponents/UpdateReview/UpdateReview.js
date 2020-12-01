import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../../apiConfig'

const ReviewUpdate = (props) => {
    const [review, setReview] = useState({ title: '', body: '', rating: '' })
    const [updated, setUpdated] = useState(false)
}

useEffect(() => {
  axios(`${apiUrl}/update-review/${props.match.params.id}`)
    .then(res => setReview(res.data.review))
    .catch(console.error)
}, [])

const handleChange = event => {
  event.persist()
  setReview(prevReview => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedReview = Object.assign({}, prevReview, updatedField)
      return editedReview
  })
}

const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/reviews/${props.match.params.id}`,
      method: 'PATCH',
      data: { review }
    })
      .then(() => setUpdated(true))
      .catch(console.error)
  }

  if (updated) {
    return <Redirect to={`/reviews/${props.match.params.id}`} />
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input
        placeholder="A Wonderful Movie"
        value={review.title}
        name="title"
        onChange={handleChange}
      />
      <label>Body</label>
      <input
        placeholder="Enter Text Here"
        value={review.body}
        name="body"
        onChange={handleChange}
      />
      <label>Rating</label>
      <input
        placeholder="Rating"
        value={review.rating}
        name="rating"
        onChange={handleChange}
      />
       <button type="submit">Submit</button>
      <Link to={'update-show/'}>
        <button>Cancel</button>
      </Link>
    </form>
  )


export default ReviewUpdate

