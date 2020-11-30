import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
// import ShowForm from '../../../ShowForm'
// import Layout from '../../../Layout'

const ReviewCreate = props => {
  const [review, setReview] = useState({ title: '', body: '', rating: '' })
  const [createdReviewId, setCreatedReviewId] = useState(null)
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
      url: `${apiUrl}/create-review`,
      method: 'POST',
      data: { review }
    })

      .then(res => setCreatedReviewId(res.data.show._id))
      .catch(console.error)
  }

  if (createdReviewId) {
    return <Redirect to={`/shows/${createdReviewId}`} />
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input
        placeholder="My Review"
        value={review.title}
        name="title"
        onChange={handleChange}
      />
      <label>Body</label>
      <input
        placeholder="Your thoughts?"
        value={review.body}
        name="body"
        onChange={handleChange}
      />
      <label>Rating</label>
      <input
        placeholder="On a scale of 1-10?"
        value={review.rating}
        name="rating"
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
      <Link to={'create-review/'}>
        <button>Cancel</button>
      </Link>
    </form>
  )
}

export default ReviewCreate
