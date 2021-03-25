import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'

//components
import Header from '../Header'

const PubIndex = () => {
  const [pubs, setPubs] = useState(null)
  useEffect(async () => {
    const { data } = await axios.get('/api/pubs')

    setPubs(data)
  }, [])

  return (
    <>
      <Header />
      {console.log(pubs)}
      <div>I am the Pubs index, welcome</div>
    </>
  )
}

export default PubIndex
