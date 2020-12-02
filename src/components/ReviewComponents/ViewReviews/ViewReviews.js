import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { viewReviews } from '../../../api/auth'

const ViewReviews = props => {
  console.log('useEffect is working ....')
  const [reviewArray, setReviewArray] = useState(null)
  const { match } = props

  useEffect(() => {
    console.log('match is... ', match)
    viewReviews(match.params.showId)
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
            <Link to={`/view-reviews/${review._id}`}>Link</Link>
          </div>
        ))}
      </div>

    )
  }
}

export default ViewReviews
