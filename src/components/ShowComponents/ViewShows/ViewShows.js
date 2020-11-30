import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../../apiConfig'

const viewShows = props => {
    const [show, setShow] = useState({ title: '' })
}
    
   const handleSubmit = (event) => {
      event.preventDefault()
      axios({
        url: `${apiUrl}/shows`,
        method: 'GET',
        data: { show }
      })
      
        .then(res => this.setState({ showArray: res.data.shows })
        .catch(console.error)
}


      return (
          <div>
            {this.state.showArray.map(show => (
                <Fragment>
                    <h2>{show.title}</h2>
                    <Link to={`/view-shows/${show._id}`}>Link</Link>
                </Fragment>
            ))}
              
          </div>

      )


// class SignOut extends Component {
//   componentDidMount () {
//     const { msgAlert, history, clearUser, user } = this.props

//     signOut(user)
//       .finally(() => msgAlert({
//         heading: 'Signed Out Successfully',
//         messagE: messages.signOutSuccess,
//         variant: 'success'
//       }))
//       .finally(() => history.push('/'))
//       .finally(() => clearUser())
//   }

//   render () {
//     return ''
//   }
// }

// export default withRouter(SignOut)
