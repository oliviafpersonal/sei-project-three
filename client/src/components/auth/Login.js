import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Login = () => {
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
    history.push('/profile')
    console.log(response)
  }

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="columns">
            <form
              className="box column is-half is-offset-one-quarter"
              onSubmit={handleSubmit}
            >
              <div className="field">
                <label className="label"> Email </label>
                <div className="control">
                  <input
                    className="input"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                  />
                </div>
              </div >
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    onChange={handleChange}
                    className="input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                  />
                </div>
              </div >
              <div className="field">
                <button type="submit" className="button is-fullwidth">
                  Log Me In!
                </button>
              </div >
            </form >
          </div >
        </div >
      </section >
    </>
  )
}

export default Login
