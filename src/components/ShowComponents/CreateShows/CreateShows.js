import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
console.log('On create show page')
const ShowCreate = props => {
  const [show, setShow] = useState({ title: '', starring: '', director: '', description: '', released: '' })
  const [createdShowId, setCreatedShowId] = useState(null)
  const handleChange = event => {
    event.persist()
    setShow(prevShow => {
      const updatedField = { [event.target.name]: event.target.value }

      const editedShow = Object.assign({}, prevShow, updatedField)
      return editedShow
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/shows`,
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + props.user.token
      },
      data: { show }
    })
      .then(res => setCreatedShowId(res.data.show._id))
      .then(console.log('handling a submit'))
      .catch(console.error)
  }

  if (createdShowId) {
    console.log('there is a show id' + createdShowId)
    return <Redirect to={`/shows/${createdShowId}`} />
  }
  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Create Show</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="A Wonderful Movie"
              value={show.title}
              name="title"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="starring">
            <Form.Label>Starring</Form.Label>
            <Form.Control
              placeholder="John Doe"
              value={show.starring}
              name="starring"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="director">
            <Form.Label>Director</Form.Label>
            <Form.Control
              placeholder="John Doe"
              value={show.director}
              name="director"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              placeholder="John Doe"
              value={show.description}
              name="description"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="released">
            <Form.Label>Released</Form.Label>
            <Form.Control
              placeholder="John Doe"
              value={show.released}
              name="released"
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
          <Link to={'/'}>
            <Button>Cancel</Button>
          </Link>
        </Form>
      </div>
    </div>
  )
}

export default ShowCreate
