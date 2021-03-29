/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getTokenFromLocalStorage } from '../../../helpers/auth'

//prettier-ignore
const Review = ({ id }) => {
  const [formData, setFormData] = useState({
    subRating: {
      price: 0,
      availability: 0,
      comfortability: 0,
    },
    text: '',
  })

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    console.log(newFormData)
    setFormData(newFormData)
  }

  //prettier-ignore
  const handleSubmit = async (event) => {
    event.preventDefault()
    const { data } = await axios.post(`/api/pubs/${id}/reviews`, formData, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    })
  }

  return (
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
              <button className="button is-primary" type="submit">
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Review
