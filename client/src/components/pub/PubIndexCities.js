import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Header from '../Header'
import PubCard from './PubCard'
import Map from '../MapBox'
import { Link } from 'react-router-dom'

const PubIndexCities = () => {
  const [filteredByCity, setFilteredByCity] = useState(null)
  const [seats, setSeats] = useState(false)
  const [pets, setPets] = useState(false)
  const [sports, setSports] = useState(false)
  const [food, setFood] = useState(false)
  const [filterPubs, setFilterPubs] = useState(false)

  const { city } = useParams()

  const title = city[0].toUpperCase() + city.slice(1)

  useEffect(async () => {
    const getData = async () => {
      const response = await axios.get('/api/pubs')
      setFilteredByCity(response.data)
      console.log(setFilteredByCity)
    }
    getData()
  }, [])

  const handleSeats = () => {
    if (!seats) {
      setSeats(true)
      setPets(false)
      setSports(false)
      setFood(false)
      setFilterPubs(false)
      console.log('first log>>>>', seats)
    } else {
      setSeats(false)
      console.log('second log>>>>', seats)
    }
  }
  const handleFood = () => {
    if (!food) {
      setFood(true)
      setPets(false)
      setSports(false)
      setSeats(false)
      setFilterPubs(false)
      console.log('first log>>>>', food)
    } else {
      setFood(false)
      setPets(false)
      setSports(false)
      setSeats(false)
      setFilterPubs(false)
      console.log('second log>>>>', food)
    }
  }

  const handlePets = () => {
    if (!pets) {
      setPets(true)
      setSeats(false)
      setSports(false)
      setFood(false)
      setFilterPubs(false)
      console.log('first log>>>>', pets)
    } else {
      setPets(false)
      setSeats(false)
      setSports(false)
      setFood(false)
      setFilterPubs(false)
      console.log('second log>>>>', pets)
    }
  }
  const handleSports = () => {
    if (!sports) {
      setSports(true)
      setPets(false)
      setSeats(false)
      setFood(false)
      setFilterPubs(false)
      console.log('first log>>>>', sports)
    } else {
      setSports(false)
      setPets(false)
      setSeats(false)
      setFood(false)
      setFilterPubs(false)
      console.log('second log>>>>', sports)
    }
  }
  const handleFilter = () => {
    if (!filterPubs) {
      setFilterPubs(true)
      setSports(false)
      setPets(false)
      setSeats(false)
      setFood(false)
      console.log('first log>>>>', filterPubs)
    } else {
      setFilterPubs(false)
      setSports(false)
      setPets(false)
      setSeats(false)
      setFood(false)
      console.log('second log>>>>', filterPubs)
    }
  }

  if (!filteredByCity) return null
  console.log('filteredByCity list>>>>', filteredByCity)
  const pubs = filteredByCity.filter((pub) => {
    const cityToCompare = city.toLowerCase()
    const pubCity = pub.address.city.toLowerCase()

    return pubCity === cityToCompare
  })

  const isSeating = pubs.filter((pub) => pub.isOutsideSeating === true)
  const isFood = pubs.filter((pub) => pub.isFoodServed === true)
  const isSports = pubs.filter((pub) => pub.isLiveSports === true)
  const isPets = pubs.filter((pub) => pub.isPetFriendly === true)
  const isRating = pubs.sort((a, b) => {
    return b - a
  })
  console.log(
    '🚀 ~ file: PubIndex.js ~ line 115 ~ isRating ~ isRating',
    isRating
  )

  return (
    <>
      <Header />

      <div className="columns">
        <div className="column">
          <div className="pub-index-container">
            <div className="pub-index-text">
              <p>{`${
                //prettier-ignore
                (sports ? isSports
                  : pets ? isPets
                    : seats ? isSeating
                      : food ? isFood
                        : pubs).length
              }+ pubs`}</p>
              {pubs.length === 0 && 
              <p>{'We couldn\'t find what you were looking for... try looking at'} <Link to="/pubs"><a className="link-to-index">all of our listed Pubs</a></Link></p>}
              <h3>Pubs in {title}</h3>
              <div className="pub-filter-buttons">
                <button
                  className="pub-filter-button button"
                  value="Outside"
                  onClick={handleSeats}
                >
                  Outside Seating
                </button>
                <button
                  className="pub-filter-button button"
                  value="Pet"
                  onClick={handlePets}
                >
                  Pet friendly
                </button>
                <button
                  className="pub-filter-button button"
                  onClick={handleFilter}
                >
                  Food Served
                </button>
                <button
                  className="pub-filter-button button"
                  onClick={handleSports}
                >
                  Live Sports
                </button>
                <button
                  className="pub-filter-button button"
                  onClick={handleFood}
                >
                  Ratings
                </button>
              </div>
              <div className="pub-filter-cta">
                <p>Use filters to refine search of Pubs.</p>
              </div>

              <hr />
            </div>

            {
              //prettier-ignore
              (sports ? isSports
                : pets ? isPets
                  : seats ? isSeating
                    : food ? isFood
                      : filterPubs ? isRating
                        : pubs).map(
                (pub) => 
                  <PubCard key={pub._id} {...pub} />
              )
                        
            }
          </div>
        </div>
        <div className="column is-two-thirds">
          {!pubs.length === 0 && <Map />}
        </div>
      </div>
    </>
  )
}

export default PubIndexCities
