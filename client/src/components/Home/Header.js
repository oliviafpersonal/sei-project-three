/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBeer, faSearch } from '@fortawesome/free-solid-svg-icons'

/// components

import Hamburger from '../Hamburger'
import axios from 'axios'

const Header = () => {
  const [eventValues, setEventValues] = useState({
    searchPubs: '',
    searchCity: '',
  })
  const history = useHistory()
  const [pubs, setPubs] = useState(null)
  
  useEffect(async () => {
    const getData = async () => {
      const response = await axios.get('/api/pubs')
      setPubs(response.data)
      console.log(setPubs)
    }
    getData()
  }, [])


  const handleChange = (event) => {
    const newEventValues = { ...eventValues, [event.target.name]: event.target.value }
    setEventValues(newEventValues)
  }
  
  const navigateToFiltered = (city) => {
    history.push(`/pubs/filter-pubs/${city}`)
  }
  const navigateToSearched = (pubID) => {
    history.push(`/pubs/${pubID}`)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    
  }
  if (!pubs) return null
  const namesArray = pubs.map(pubs => pubs.nameOfPub.toLowerCase())
  const idArray = pubs.map(pubs => pubs._id)
  console.log('🚀 ~ file: Header.js ~ line 45 ~ Header ~ idArray', idArray)
  console.log('🚀 ~ file: Header.js ~ line 44 ~ Header ~ namesArray', namesArray)
  return (
    <>
      <section className="hero is-large header-style">
        <header>
          <div className="columns">
            <div className="column is-two-thirds">
              <Link to={'/'}>
                <div className="logo">
                  <FontAwesomeIcon icon={faBeer} />
                  <span className="logo-space">Pubhub</span>
                </div>{' '}
              </Link>
            </div>
            <div className="column">
              <Link to="/landlord">
                <p className="header-links">Become a Landlord</p>
              </Link>
            </div>
            <div className="column left">
              <Hamburger />
            </div>
          </div>
        </header>
        <div className="hero-body header-bg">
          <div className="search-bar">
            <form className="search-container" onSubmit={handleSubmit}>
              <div className="location">
                <label className="location-label">Location</label>
                <input
                  placeholder="Where are you drinking?"
                  className="search-input" name="search-city"
                  onChange={handleChange}
                ></input>
              </div>
              <div className="location">
                <label className="location-label">Search Pubs</label>
                <input
                  placeholder="Got a specific pub in mind?"
                  className="search-input" name="search-pubs"
                  onChange={handleChange}
                ></input>
              </div>
              <button className="search-button button">
                <div className="search-icon">
                  <FontAwesomeIcon icon={faSearch} />
                </div>
              </button>
            </form>
          </div>
        </div>
        <div className="cta-container">
          <div className="header-cta">Made possible by Landlords </div>
        </div>
      </section>
    </>
  )
}

export default Header
