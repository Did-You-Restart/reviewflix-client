import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { viewReviews } from '../../../api/auth'
import Spinner from 'react-bootstrap/Spinner'

const ViewReviews = props => {
  const [reviewArray, setReviewArray] = useState(null)
  const { user, match } = props

  useEffect(() => {
    viewReviews(user, match.params.showId)
      .then(res => {
        setReviewArray(res.data.reviews)
      })
      .catch(console.error)
  }, [])

  if (!reviewArray) {
    return (<Spinner animation="border" className='dangerous' role="status">
      <span className="danger"> <br></br>Loading...</span>
    </Spinner>)
  } else {
    return (
      <div>
        {reviewArray.map(review => (
          <div key={review._id}>
            <h2>{review.title}</h2>
            <h2>{review.body}</h2>
            <h2>{review.rating}</h2>
            <Link to={`/reviews/${review._id}`}>Edit Review</Link>
          </div>
        ))}
      </div>

    )
  }
}

export default ViewReviews
