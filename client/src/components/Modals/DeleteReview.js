import React from 'react'
import { useHistory } from 'react-router-dom'

const DeleteReview = () => {
  const history = useHistory()

  const homeRedirect = (event) => {
    event.preventDefault()
    history.push('/')
  }

  const signupRedirect = (event) => {
    event.preventDefault()
    history.push('/signup')
  }

  return (
    <div>
      <p>We are so sorry to see you go. If you change your mind, you can easily make a new profile. We hope you do!</p>
      <button onClick={homeRedirect}>Take me to the home page</button>
      <button onClick={signupRedirect}>Take me to make a new account</button>
    </div>
  )
}

export default DeleteReview
