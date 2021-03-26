import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'

//components
import Header from '../Header'
import PubCard from './PubCard'

const PubIndex = () => {
  const [pubs, setPubs] = useState(null)

  useEffect(async () => {
    const getData = async () => {
      const response = await axios.get('/api/pubs')
      setPubs(response.data)
      console.log(setPubs)
    }
    getData()
  }, [])

  if (!pubs) return null
  return (
    <>
      <Header />

      <div className="columns">
        <div className="column">
          <div className="pub-index-container">
            <div className="pub-index-text">
              <p>{`${pubs.length}+ pubs`}</p>
              <h3>Pubs in London</h3>
              <div className="pub-filter-buttons">
                <button className="pub-filter-button button">
                  Outside Seating
                </button>
                <button className="pub-filter-button button">
                  Pet friendly
                </button>
                <button className="pub-filter-button button">
                  Food Served
                </button>
                <button className="pub-filter-button button">
                  Live Sports
                </button>
                <button className="pub-filter-button button">Ratings</button>
              </div>
              <div className="pub-filter-cta">
                <p>Use filters to refine search of Pubs.</p>
              </div>

              <hr />
            </div>

            {pubs.map((pub) => (
              <PubCard key={pub._id} {...pub} />
            ))}
          </div>
        </div>
        <div className="column is-two-thirds"></div>
      </div>
    </>
  )
}

export default PubIndex
