import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'

import { viewReview, deleteReview } from '../../../api/auth'
const ViewReview = (props) => {
  // const [loading, setLoading] = useState(true)
  const [review, setReview] = useState(null)
  const { user, msgAlert, match, history } = props

  useEffect(() => {
    viewReview(user, match.params.reviewId)
      .then(res => {
        setReview(res.data.review)
      })
      .then(() => {
        msgAlert({
          heading: 'View Review Success',
          message: 'See the Review there!',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Review Failed :(',
          message: 'Error code: ' + err.message,
          variant: 'danger'
        })
      })
  }, [])

  const handleDelete = () => {
    deleteReview(user, match.params.reviewId)
      .then(() => {
        msgAlert({
          heading: 'Review Deleted',
          message: 'Back to the list of reviews that exist',
          variant: 'success'
        })
      })
      .then(() => history.push('/reviews'))
      .catch(err => {
        msgAlert({
          heading: 'Deletion Failed',
          message: 'Something went wrong: ' + err.message,
          variant: 'danger'
        })
      })
  }

  return (
    <div>
      {review ? (
        <div>
          <Card style={{ width: '18rem' }} className="text-center">
            <Card.Title>{review.title}</Card.Title>
            <Card.Text>{review.body}</Card.Text>
            <Card.Text>Rating: {review.rating}</Card.Text>
            {user._id === review.owner ? <Link to={`/review-update/${review._id}`}>Edit Review</Link> : ''}
            <button onClick={handleDelete}>Delete Review</button>
          </Card>
        </div>
      ) : <Spinner animation="border" className='dangerous' role="status">
        <span className="danger"> <br></br>Loading...</span>
      </Spinner>}
    </div>
  )
}

export default withRouter(ViewReview)
