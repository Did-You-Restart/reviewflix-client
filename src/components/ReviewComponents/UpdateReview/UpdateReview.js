import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { updateReview, viewReview } from '../../../api/auth'

const ReviewUpdate = (props) => {
  const [review, setReview] = useState({ title: '', body: '', rating: '' })
  const [updated, setUpdated] = useState(false)
  const { msgAlert } = props

  useEffect(() => {
    viewReview(props.user, props.match.params.reviewId)
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
    updateReview(props.user, review, props.match.params.reviewId)
      .then(() => setUpdated(true))
      .then(() => {
        msgAlert({
          heading: 'Update Review Success',
          message: 'Nice Job!',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Update Review Failed :(',
          message: 'Error code: ' + err.message,
          variant: 'danger'
        })
      })
      .catch(console.error)
  }

  if (updated) {
    return <Redirect to={`/reviews/${props.match.params.reviewId}`} />
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
      <label>body</label>
      <input
        placeholder="Wow so good"
        value={review.description}
        name="body"
        onChange={handleChange}
      />
      <label>Rating</label>
      <input
        placeholder="10"
        value={review.released}
        name="rating"
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
      <Link to={'update-review/'}>
        <button>Cancel</button>
      </Link>
    </form>
  )
}

export default ReviewUpdate
