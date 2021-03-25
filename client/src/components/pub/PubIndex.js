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
      {console.log(pubs)}
      <div>I am the Pubs index, welcome</div>
      <div>
        {pubs.map(pub => (
          <PubCard key={pub._id} {...pub} />
        ))}
      </div>
    </>
  )
}

export default PubIndex
