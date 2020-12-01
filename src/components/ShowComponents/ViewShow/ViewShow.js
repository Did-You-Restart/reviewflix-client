import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { viewShow, deleteShow } from '../../../api/auth'
console.log('On view show page')
const ViewShow = (props) => {
  // const [loading, setLoading] = useState(true)
  const [show, setShow] = useState(null)
  const { user, msgAlert, match, history } = props

  useEffect(() => {
    viewShow(user, match.params.show.id)
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
    deleteShow(user, match.params.show.id)
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
          <p>Directed by: {show.director}</p>
          <button onClick={handleDelete}>Delete</button>
          <Link to={'/show-update/' + show._id}>Update Show</Link>
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default withRouter(ViewShow)
