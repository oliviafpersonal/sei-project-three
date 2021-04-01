import React, { useState } from 'react'
import axios from 'axios'

import { useHistory } from 'react-router'

//prettier-ignore
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  //prettier-ignore
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }
  const history = useHistory()
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/register', formData)
      console.log(response)
      history.push('/login')
    } catch (err) {
      console.log(err.response)
      setErrors(err.response.data.errors)
    }

  }

  return (
    <>
      <form
        className="login-box"
        onSubmit={handleSubmit}>
        <h2>Register Here</h2>
        <hr />
       
        <div className="login-input-box">
          <input
            className={`login-input ${errors.username ? 'is-danger' : ''}`}
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
      
          {errors.username && (
            <p className="help is-danger">username error</p>
          )}
        </div>
        <div className="sign-up-input-box-middle">
          <input
            className={`login-input ${errors.email ? 'is-danger' : ''}`}
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="help is-danger">email error</p>}
        </div>
        <div className="sign-up-input-box-middle">
          <input
            className={`login-input ${errors.password ? 'is-danger' : ''}`}
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          /> 
          {errors.password && (
            <p className="help is-danger">password error</p>
          )}
        </div>
        <div className="login-input-box-pass">
          <input
            className={`login-input ${errors.passwordConfirmation ? 'is-danger' : ''}`}
            type="password"
            placeholder="Password Confirmation"
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
            onChange={handleChange}
          />       
          {errors.passwordConfirmation && (
            <p className="help is-danger">password confirmation error</p>
          )}
        </div>
        <div className="field">
          <hr />
          <button type="submit" className="button login-button is-fullwidth ">
                  Register Me!
          </button>
        </div>
      </form>
        
   
    </>
  )
}

export default Register
