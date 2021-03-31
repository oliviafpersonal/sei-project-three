import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import Header from '../Header'
import Clink from '../../styles/assets/clink.png'

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
    history.push('/')
    console.log(response)
  }

  return (
    <>
      <Header />
      <div className="login-container">
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column ">
                <form className="login-box" onSubmit={handleSubmit}>
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

                  {/* </div> */}
                  {/* </div> */}
                  <div className="field">
                    <hr />
                    <button
                      type="submit"
                      className="button login-button is-fullwidth "
                    >
                      Log Me In!
                    </button>
                  </div>
                </form>
              </div>
              <div className="column">
                <img src={Clink}></img>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Login
