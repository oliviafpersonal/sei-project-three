import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'

//components
import Header from '../Header'

const PubIndex = () => {
  const [pubs, setPubs] = useState(null)

  useEffect(async () => {
    const getData = async () => {
      const response = await axios.get('/api/pubs')
      setPubs(response.data)
      console.log(response.data)
    }
    getData()
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
