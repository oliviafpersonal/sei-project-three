import React, { useState } from 'react'
//import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  console.log(formData, setFormData)

  const history = useHistory()
  console.log(history)

  /*
    const handleChange = event => {
      const newFormData = { ...formData, [event.target.name]: event.target.value }
      setFormData(newFormData)
    }
  
    const handleSubmit = async event => {
      event.preventDefault()
      const response = await axios.post('', formData)
      window.localStorage.setItem('token', response.data.token)
      history.push('/')
    }
  */
  return (
    <div>
      Log in
    </div>
  )
}

export default Login
