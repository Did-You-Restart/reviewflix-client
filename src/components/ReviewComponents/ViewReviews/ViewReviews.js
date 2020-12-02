import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { viewReviews } from '../../../api/auth'

const ViewReviews = props => {
  const [reviewArray, setReviewArray] = useState(null)
  const { user, match } = props

  useEffect(() => {
    console.log('match is... \n', match)
    console.log('match.params.showId is... \n', match.params.showId)
    viewReviews(user, match.params.showId)
      .then(res => {
        console.log('response is \n', res)
        console.log('res.data.reviews is \n', res.data.reviews)
        setReviewArray(res.data.reviews)
      })
      .catch(console.error)
  }, [])

  if (!reviewArray) {
    return ('loading...')
  } else {
    console.log('reviewArray is... \n', reviewArray)
    return (
      <div>
        {reviewArray.map(review => (
          <div key={review._id}>
            <h2>{review.title}</h2>
            <h2>{review.body}</h2>
            <h2>{review.rating}</h2>
            <Link to={`/reviews/${review._id}`}>     Edit Review</Link>
          </div>
        ))}
      </div>

    )
  }
}

export default ViewReviews
