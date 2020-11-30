import { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { createReview } from '../../../api/auth'
import messages from '../../AutoDismissAlert/messages'

class CreateReview extends Component {
  componentDidMount () {
    const { msgAlert, history, clearUser, user } = this.props

    createReview(user)
      .finally(() => msgAlert({
        heading: 'Review Created Successfully',
        message: messages.createReviewSuccess,
        variant: 'success'
      }))
      .finally(() => history.push('/'))
      .finally(() => clearUser())
  }

  render () {
    return ''
  }
}

export default withRouter(CreateReview)
