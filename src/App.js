import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
// <-------- Review imports ------------->
import CreateReview from './components/ReviewComponents/CreateReview/CreateReview'
import UpdateReview from './components/ReviewComponents/UpdateReview/UpdateReview'
import DeleteReview from './components/ReviewComponents/DeleteReview/DeleteReview'
import ViewReview from './components/ReviewComponents/ViewReview/ViewReview'
import ViewReviews from './components/ReviewComponents/ViewReviews/ViewReviews'
// <-------- Show imports ------------->
import CreateShow from './components/ShowComponents/CreateShows/CreateShows'
import UpdateShow from './components/ShowComponents/UpdateShow/UpdateShow'
import DeleteShow from './components/ShowComponents/DeleteShow/DeleteShow'
import ViewShow from './components/ShowComponents/ViewShow/ViewShow'
import ViewShows from './components/ShowComponents/ViewShows/ViewShows'

class App extends Component {
  constructor () {
    super()
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/deletereview/:reviewId' render={({ match }) => (
            <DeleteReview
              msgAlert={this.msgAlert}
              user={user}
              match={match}
            />
          )} />
          <AuthenticatedRoute user={user} exact path='/reviews/:reviewId' render={({ match }) => (
            <ViewReview
              user={user}
              msgAlert={this.msgAlert}
              match={match}
            />
          )}/>
          <Route user={user} exact path='/shows/:showId/reviews' render={({ match }) => (
            <ViewReviews
              user={user}
              msgAlert={this.msgAlert}
              match={match}
            />
          )}/>
          <AuthenticatedRoute user={user} path='/review-update/:reviewId' render={({ match, history }) => (
            <UpdateReview
              match={match}
              history={history}
              user={user}
              msgAlert={this.msgAlert}
            />
          )}/>
          <Route user={user} exact path='/view-shows' render={() => (
            <ViewShows
              user={user}
              msgAlert={this.msgAlert}
            />
          )}/>
          <AuthenticatedRoute user={user} path='/create-shows' render={() => (
            <CreateShow
              user={user}
              msgAlert={this.msgAlert}
            />
          )}/>
          <AuthenticatedRoute user={user} path='/delete-show/:showId' render={({ match }) => (
            <DeleteShow
              msgAlert={this.msgAlert}
              user={user}
              match={match}
            />
          )} />
          <AuthenticatedRoute user={user} path='/shows/:showId' render={({ match }) => (
            <ViewShow
              user={user}
              msgAlert={this.msgAlert}
              match={match}
            />
          )}/>
          <AuthenticatedRoute user={user} path='/show-update/:showId' render={({ match, history }) => (
            <UpdateShow
              match={match}
              history={history}
              user={user}
              msgAlert={this.msgAlert}
            />
          )}/>
          <AuthenticatedRoute user={user} path='/create-review/:showId' render={({ match }) => (
            <CreateReview
              match={match}
              user={user}
              msgAlert={this.msgAlert}
            />
          )} />
        </main>
      </Fragment>

    )
  }
}

export default App
