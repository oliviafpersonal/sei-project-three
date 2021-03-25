import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PubIndex = () => {
  const [pubs, setPubs] = useState(null)
  useEffect(async () => {
    const { data } = await axios.get('/api/pubs')
    console.log(data)
    setPubs(data)
  }, [])


  if (!pubs) return null
  return (
    <>
      {console.log(pubs)}
      <div>
        I am the Pubs index, welcome
      </div>
      <Link to="/"><button>homePage</button></Link>
    </>
  )
}

export default PubIndex
