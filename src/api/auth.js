import apiUrl from '../apiConfig'
import axios from 'axios'
// import { data } from 'autoprefixer'

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

export const createReview = (review, user) => {
  return axios({
    url: apiUrl + '/create-reviews',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + user.token
    },
    data: {
      review: {
        title: review.title,
        body: review.body,
        rating: review.rating
      }
    }
  })
}

export const viewReview = (user, id) => {
  return axios({
    url: apiUrl + '/reviews/' + id,
    headers: {
      Authorization: 'Bearer ' + user.token
    },
    method: 'GET'
  })
}

export const viewReviews = (show, review, id) => {
  return axios({
    url: apiUrl + '/reviews/' + show._id,
    method: 'GET'
  }
  )
}

export const updateReview = (user, review, id) => {
  console.log('the stuff is', user)
  return axios({
    url: apiUrl + '/reviews/' + id,
    headers: {
      Authorization: 'Bearer ' + user.token
    },
    method: 'PATCH',
    data: {
      review: {
        title: review.title,
        body: review.body,
        rating: review.rating
      }
    }
  })
}

export const deleteReview = (user, id) => {
  return axios({
    url: apiUrl + '/reviews/' + id,
    headers: {
      Authorization: 'Bearer ' + user.token
    },
    method: 'DELETE'
  })
}

// // <---- Show Crud Zone ----->
// // <--------------------------->
// // <--------------------------->

export const createShow = (show, user) => {
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

export const viewShow = (user, id) => {
  return axios({
    url: apiUrl + '/shows/' + id,
    headers: {
      Authorization: 'Bearer ' + user.token
    },
    method: 'GET'
  })
}

export const viewShows = (user, id) => {
  return axios({
    url: apiUrl + '/shows/',
    method: 'GET'
  }
  )
}

export const updateShow = (user, show, id) => {
  console.log('the stuff is', user)
  return axios({
    url: apiUrl + '/shows/' + id,
    headers: {
      Authorization: 'Bearer ' + user.token
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

export const deleteShow = (user, id) => {
  return axios({
    url: apiUrl + '/shows/' + id,
    headers: {
      Authorization: 'Bearer ' + user.token
    },
    method: 'DELETE'
  })
}
