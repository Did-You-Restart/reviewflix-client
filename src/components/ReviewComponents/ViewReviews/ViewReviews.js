import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../../apiConfig'

const viewReviews = props => {
  const [reviewArray, setReviewArray] = useState(null)

  const handleSubmit = (event, review) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/reviews`,
      method: 'GET',
      data: { review }
    })
      .then(res => setReviewArray({ reviewArray: res.data.reviews }))
      .catch(console.error)
  }

  if (!reviewArray) {
    return ('loading...')
  } else {
    return (
      <div>
        {reviewArray.map(review => (
          <div key='reviews-list'
            onChange={handleSubmit}>
            <h2>{review.title}</h2>
            <h2>{review.body}</h2>
            <h2>{review.rating}</h2>
            <Link to={`/view-reviews/${review._id}`}>Link</Link>
          </div>
        ))}
      </div>

    )
  }
}

export default viewReviews
