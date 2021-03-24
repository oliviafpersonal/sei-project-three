import React, { useState } from 'react'
//import axios from 'axios'

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  console.log(formData, setFormData)
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  console.log(errors, setErrors)

  /*
    const handleChange = event => {
      const newFormData = { ...formData, [event.target.name]: event.target.value }
      setFormData(newFormData)
    }
    const handleSubmit = async event => {
      event.preventDefault()
      try {
        const response = await axios.post('', formData)
        console.log(response)
      } catch (err) {
        console.log(err.response)
        setErrors(err.response.data.errors)
      }
    }
  */

  return (
    <div>
      SignUp
    </div>
  )
}

export default Signup
