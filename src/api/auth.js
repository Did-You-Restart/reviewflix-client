import apiUrl from '../apiConfig'
import axios from 'axios'

export const signUp = credentials => {
  return axios({
    method: 'POST',
    url: apiUrl + '/sign-up',
    data: {
      credentials: {
        email: credentials.email,
        username: credentials.username,
        password: credentials.password,
        password_confirmation: credentials.passwordConfirmation
      }
    }
  })
}

export const signIn = credentials => {
  return axios({
    url: apiUrl + '/sign-in',
    method: 'POST',
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password
      }
    }
  })
}

export const signOut = user => {
  return axios({
    url: apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const changePassword = (passwords, user) => {
  return axios({
    url: apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword
      }
    }
  })
}

// <---- Review Crud Zone ----->
// <--------------------------->
// <--------------------------->

export const createReview = review => {
  return axios({
    url: apiUrl + '/create-reviews',
    method: 'POST',
    data: {
      review: {
        title: review.title,
        body: review.body,
        rating: review.rating
      }
    }
  })
}
//
// export const viewReviews = review => {
//   return axios({
//     url: apiUrl + '/view-reviews',
//     headers: {
//       Authorization: 'Bearer ' + store.user.token
//     },
//     method: 'GET',
//     data: data
//   })
// }
//
// export const updateReview = review => {
//   return axios({
//     url: apiUrl + '/reviews/' + data.review.id,
//     headers: {
//       Authorization: 'Bearer ' + store.user.token
//     },
//     method: 'PATCH',
//     data: {
//       review: {
//         title: review.title,
//         body: review.body,
//         rating: review.rating
//       }
//     }
//   })
// }
//
// export const deleteReview = review => {
//   return axios({
//     url: apiUrl + '/reviews/' + data.review.id,
//     headers: {
//       Authorization: 'Bearer ' + store.user.token
//     },
//     method: 'DELETE',
//     data: {
//       review: {
//         title: review.title,
//         body: review.body,
//         rating: review.rating
//       }
//     }
//   })
// }
//
// // <---- Show Crud Zone ----->
// // <--------------------------->
// // <--------------------------->

export const createShow = (show, user) => {
  console.log('creating', user)
  return axios({
    url: apiUrl + '/create-shows',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + user.token
    },
    data: {
      show: {
        title: show.title,
        starring: show.starring,
        director: show.director,
        description: show.description,
        released: show.released
      }
    }
  })
}

export const viewShow = user => {
  return axios({
    url: apiUrl + '/view-shows',
    headers: {
      Authorization: 'Bearer ' + user.token
    },
    method: 'GET',
    data: {
      show: {
        title: user.title,
        starring: user.starring,
        director: user.director,
        description: user.description,
        released: user.released
      }
    }
  })
}

export const updateShow = (data, show) => {
  return axios({
    url: apiUrl + '/shows/' + data.show.id,
    headers: {
      Authorization: 'Bearer ' + show.user.token
    },
    method: 'PATCH',
    data: {
      show: {
        title: show.title,
        starring: show.starring,
        director: show.director,
        description: show.description,
        released: show.released
      }
    }
  })
}

export const deleteShow = user => {
  return axios({
    url: apiUrl + '/shows/' + user.show.id,
    headers: {
      Authorization: 'Bearer ' + user.token
    },
    method: 'DELETE',
    data: {
      show: {
        title: user.show.title,
        starring: user.show.starring,
        director: user.show.director,
        description: user.show.description,
        released: user.show.released
      }
    }
  })
}
