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
          {pubs.map((pub) => (
            <PubCard key={pub._id} {...pub} />
          ))}
        </div>
        <div className="column"></div>
      </div>
    </>
  )
}

export default PubIndex
