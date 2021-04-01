import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import 'animate.css'

import { userIsAuthenticated } from '../../helpers/auth'

const LoginModal = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const history = useHistory()

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await axios.post('/api/login', formData)
    window.localStorage.setItem('token', response.data.token)
    history.push('/landlord/signup')
    console.log(response)
  }

  return (
    <>
      {!userIsAuthenticated() && (
        <form
          className="login-box animate__animated animate__fadeInUp"
          onSubmit={handleSubmit}
        >
          <h2>Login here</h2>
          <hr />
          <div className="login-input-box">
            <input
              className="login-input"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
          </div>
          <div className="login-input-box-pass">
            <input
              onChange={handleChange}
              className="login-input"
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
            />
          </div>
          <div className="field">
            <hr />
            <button type="submit" className="button login-button is-fullwidth ">
              Log Me In!
            </button>
          </div>
        </form>
      )}
      {userIsAuthenticated() && (
        <div className="login-h1">
          <h1>You have logged in click to close</h1>
        </div>
      )}
    </>
  )
}

export default LoginModal
