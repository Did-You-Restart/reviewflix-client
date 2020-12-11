import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { viewShows } from '../../../api/auth'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'

const ViewShows = props => {
  const [showArray, setShowArray] = useState(null)
  const { user } = props

  useEffect(() => {
    viewShows()
      .then(res => {
        setShowArray(res.data.shows)
      })
      .catch(console.error)
  }, [])

  if (!showArray) {
    return (<Spinner animation="border" className='dangerous' role="status">
      <span className="danger"> <br></br>Loading...</span>
    </Spinner>)
  } else {
    return (
      <div>
        {showArray.map(show => (
          <div key={show._id}>
            <Card className="text-center">
              <Card.Title>{show.title}</Card.Title>
              <Card.Text>Starring: {show.starring}</Card.Text>
              {user ? <Link to={`/shows/${show._id}`}>More Info   </Link> : '' }
            </Card>
          </div>
        ))}
      </div>

    )
  }
}

export default ViewShows
