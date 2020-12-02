import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { viewShow, deleteShow } from '../../../api/auth'

const ViewShow = (props) => {
  const [show, setShow] = useState(null)
  const { user, msgAlert, match, history } = props

  useEffect(() => {
    viewShow(user, match.params.showId)
      .then(res => {
        console.log(res)
        setShow(res.data.show)
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
      {show ? (
        <div>
          <h2>{show.title}</h2>
          <h4>Starring: {show.starring}</h4>
          <h6>Directed by: {show.director}</h6>
          <p>{show.description}</p>
          <p>released: {show.released}</p>
          <Button onClick={handleDelete}>Delete</Button>
          <Link to={'/show-update/' + show._id}>      Update Show</Link>
          <Link to={'/create-review/' + show._id}>      Review Show</Link>
          <Link to={'/view-reviews/' + show._id}>      See Review</Link>
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default withRouter(ViewShow)
