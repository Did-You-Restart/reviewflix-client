import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { viewReviews } from '../../../api/auth'

const ViewReviews = props => {
  const [reviewArray, setReviewArray] = useState(null)

  useEffect(() => {
    viewReviews()
      .then(res => {
        console.log(res)
        setReviewArray(res.data.reviews)
      })
      .catch(console.error)
  }, [])

  if (!reviewArray) {
    return ('loading...')
  } else {
    return (
      <div>
        {reviewArray.map(review => (
          <div key={review._id}>
            <h2>{review.title}</h2>
            <Link to={`/reviews/${review._id}`}>Link</Link>
          </div>
        ))}
      </div>

    )
  }
}

export default ViewReviews
