import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { viewShow, deleteShow } from '../../../api/auth'
import Card from 'react-bootstrap/Card'

const ViewShow = (props) => {
  const [show, setShow] = useState(null)
  const [reviews, setReviews] = useState(null)
  const { user, msgAlert, match, history } = props

  useEffect(() => {
    viewShow(user, match.params.showId)
      .then(res => {
        console.log(res)
        setShow(res.data.show)
        setReviews(res.data.reviews)
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
    console.log(match.params.showId)
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

  return (
    <div>
      {show && reviews ? (
        <div>
          <div>
            <Card>
              <Card.Title>{show.title}</Card.Title>
              <Card.Text>Starring: {show.starring}</Card.Text>
              <Card.Text>Directed by: {show.director}</Card.Text>
              <Card.Text>{show.description}</Card.Text>
              <Card.Text>released: {show.released}</Card.Text>
              <Link to={'/show-update/' + show._id}>      Update Show</Link>
              <Link to={'/create-review/' + show._id}>      Review Show</Link>
              <Button onClick={handleDelete}>Delete This Show</Button>
            </Card>
            {reviews.map(review => (
              <div key={review._id}>
                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>{review.title}</Card.Title>
                    <Card.Text>{review.body}</Card.Text>
                    <Card.Text>Rating: {review.rating}</Card.Text>
                    <Link to={`/reviews/${review._id}`}>     Edit Review</Link>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default withRouter(ViewShow)
