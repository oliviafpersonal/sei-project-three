/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom'

import { getTokenFromLocalStorage } from '../../../helpers/auth'

//components
import Header from '../../Header'

//prettier-ignore
const Review = () => {
  const history = useHistory()
  const [formData, setFormData] = useState({
    price: 0,
    availability: 0,
    comfortability: 0,
    text: 'No comment added',
  })
  const { id } = useParams()
  console.log('id>>>>>', id)
  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    console.log(newFormData)
    setFormData(newFormData)
  }

  //prettier-ignore
  const handleSubmit = async (event) => {
    console.log(formData)
    event.preventDefault()
    try {
      const response = await axios.post(`/api/pubs/${id}/reviews`, formData, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      console.log(response)
      history.push(`/pubs/${id}`)
    } catch (err){
      console.log(err.message)
    }
    

  }

  return (
<<<<<<< HEAD
    <form onSubmit={handleSubmit}>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Price</label>
        </div>
        <div className="field-body">
          <div className="field is-narrow">
            <div className="control">
              <div className="select is-fullwidth">
                <select onChange={handleChange} name="price">
                  
                  <option value="">Choose a rating</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
=======
    <>
      <Header />
      <div className="submit-review-container">
        <div className="columns">
          <div className="column is-two-thirds">
            <div className="submit-review-details">
              <div className="review-breadcrumb"><b> <Link to={`/pubs/${id}`}>Pub</Link> <span className="crumb-arrow">{'>'} </span> {'Submit Review'}</b></div>
              <h2>Submit your review of the pub</h2>
              <hr/>
              <p>Input your ratings and your review of the pub based on your experience</p>
              <br/>
>>>>>>> review-style
            </div>
            

<<<<<<< HEAD
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Comfortability</label>
        </div>
        <div className="field-body">
          <div className="field is-narrow">
            <div className="control">
              <div className="select is-fullwidth">
                <select onChange={handleChange} name="comfortability">
                  
                  <option value="">Choose a rating</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Availability</label>
        </div>
        <div className="field-body">
          <div className="field is-narrow">
            <div className="control">
              <div className="select is-fullwidth">
                <select onChange={handleChange} name="availability">
                  
                  <option value="">Choose a rating</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
=======
            <div className="review-box">
              <form onSubmit={handleSubmit}>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Price</label>
                  </div>
                  <div className="field-body">
                    <div className="field is-narrow">
                      <div className="control">
                        <div className="select is-fullwidth">
                          <select onChange={handleChange} name="price">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option defaultValue="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr/>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Comfortability</label>
                  </div>
                  <div className="field-body">
                    <div className="field is-narrow">
                      <div className="control">
                        <div className="select is-fullwidth">
                          <select onChange={handleChange} name="comfortability">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option defaultValue="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr/>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Availability</label>
                  </div>
                  <div className="field-body">
                    <div className="field is-narrow">
                      <div className="control">
                        <div className="select is-fullwidth">
                          <select onChange={handleChange} name="availability">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option defaultValue="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr/>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Review</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <textarea
                          className="textarea"
                          onChange={handleChange}
                          name="text"
                          placeholder="What did you think? "
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="field is-horizontal">
                  <div className="field-label"></div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <button className="button " type="submit">
                Submit Review
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
>>>>>>> review-style
            </div>
          </div>
          <div className="column">
            
          </div>


        </div>


      </div>
     
    </>
  )
  
}

export default Review
