import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { viewShow, deleteShow, deleteReview } from '../../../api/auth'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'

const ViewShow = (props) => {
  const [show, setShow] = useState(null)
  const [reviews, setReviews] = useState(null)
  const [owner, setOwner] = useState(null)
  const { user, msgAlert, match, history } = props

  useEffect(() => {
    viewShow(user, match.params.showId)
      .then(res => {
        setShow(res.data.show)
        setReviews(res.data.reviews)
        setOwner(res.data.show.owner)
      })
      .then(() => {
        msgAlert({
          heading: 'View Show Success',
          message: 'See the Show there!',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Show Show Failed :(',
          message: 'Error code: ' + err.message,
          variant: 'danger'
        })
      })
  }, [])

  const handleDelete = () => {
    deleteShow(user, match.params.showId)
      .then(() => {
        msgAlert({
          heading: 'Show Deleted',
          message: 'Back to the list of shows that exist',
          variant: 'success'
        })
      })
      .then(() => history.push('/shows'))
      .catch(err => {
        msgAlert({
          heading: 'Deletion Failed',
          message: 'Something went wrong: ' + err.message,
          variant: 'danger'
        })
      })
  }

  const handleRevDelete = () => {
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
      {show && reviews ? (
        <div>
          <div>
            <Card border="dark" className="text-center">
              <Card.Title>{show.title}</Card.Title>
              <Card.Text>Starring: {show.starring}</Card.Text>
              <Card.Text>Directed by: {show.director}</Card.Text>
              <Card.Text>{show.description}</Card.Text>
              <Card.Text>released: {show.released}</Card.Text>
              {user._id === owner ? <Link to={'/show-update/' + show._id}>Update Show</Link> : '' }
              <Link to={'/create-review/' + show._id}>Review Show</Link>
              {user._id === owner ? <Button onClick={handleDelete}>Delete This Show</Button> : '' }
            </Card>
            {reviews.map(review => (
              <div key={review._id}>
                <Card border="dark" style={{ width: '18rem' }} className="text-center">
                  <Card.Title>{review.title}</Card.Title>
                  <Card.Text>{review.body}</Card.Text>
                  <Card.Text>Rating: {review.rating}</Card.Text>
                  {user._id === review.owner ? <Link to={`/review-update/${review._id}`}>Edit Review</Link> : '' }
                  {user._id === review.owner ? <button onClick={handleRevDelete}>Delete Review</button> : '' }
                </Card>
              </div>
            ))}
          </div>
        </div>
      ) : <Spinner animation="border" className='dangerous' role="status">
        <span className="danger"> <br></br>Loading...</span>
      </Spinner>}
    </div>
  )
}

export default withRouter(ViewShow)
