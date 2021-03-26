import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams /*, Link*/ } from 'react-router-dom'

//components
import Header from '../Header'

const PubShow = () => {
  const params = useParams()

  const [pub, setPub] = useState('')

  useEffect(() => {
    console.log(pub, setPub)

    const getData = async () => {
      const response = await axios.get(`/api/pubs/${params.id}`)
      setPub(response.data)
    }
    console.log(setPub)
    getData()
  }, [])

  if (!pub) return null
  return (
    <>
      <Header />
      <div className="pub-show-container">
        <div className="section">
          <h2>{pub.nameOfPub}</h2>
          <img src={pub.image}></img>

          <p>{pub.description}</p>
          <p>{pub.address.city}</p>
        </div>
      </div>
    </>
  )
}

export default PubShow
