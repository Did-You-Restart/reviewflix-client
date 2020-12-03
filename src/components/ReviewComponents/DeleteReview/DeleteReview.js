// import React, { useState, useEffect } from 'react'
// import { Link, withRouter } from 'react-router-dom'

// import { viewReview, deleteReview } from '../../../api/auth'
// ('On view review page')
// const DeleteReview = (props) => {
//   // const [loading, setLoading] = useState(true)
//   const [review, setReview] = useState(null)
//   const { user, msgAlert, match, history } = props

//   useEffect(() => {
//     viewReview(user, match.params.reviewId)
//       .then(res => {
//         .log(res)
//         setReview(res.data.review)
//       })
//       .then(() => {
//         msgAlert({
//           heading: 'View Review Success',
//           message: 'See the Review there!',
//           variant: 'success'
//         })
//       })
//       .catch(err => {
//         msgAlert({
//           heading: 'Review Review Failed :(',
//           message: 'Error code: ' + err.message,
//           variant: 'danger'
//         })
//       })
//   }, [])

//   const handleDelete = () => {
//     console.log(match.params.reviewId)
//     deleteReview(user, match.params.reviewId)
//       .then(() => {
//         msgAlert({
//           heading: 'Review Deleted',
//           message: 'Back to the list of reviews that exist',
//           variant: 'success'
//         })
//       })
//       .then(() => history.push('/reviews'))
//       .catch(err => {
//         msgAlert({
//           heading: 'Deletion Failed',
//           message: 'Something went wrong: ' + err.message,
//           variant: 'danger'
//         })
//       })
//   }

//   return (
//     <div>
//       {review ? (
//         <div>
//           <h2>{review.title}</h2>
//           <p>Directed by: {review.director}</p>
//           <button onClick={handleDelete}>Delete</button>
//           <Link to={'/review-update/' + review._id}>Update Review</Link>
//         </div>
//       ) : 'Loading...'}
//     </div>
//   )
// }

// export default withRouter(DeleteReview)
