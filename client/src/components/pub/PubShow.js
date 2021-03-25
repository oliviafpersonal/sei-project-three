import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams /*, Link*/ } from 'react-router-dom'


const PubShow = () => {
  const params = useParams()
  console.log(params)

  const [pubs, setPubs] = useState('')

  useEffect(() => {
    console.log(pubs, setPubs)

    const getData = async () => {
      const response = await axios.get(`/api/pubs/${params.id}`)
      setPubs(response.data)
    }
    getData()
  }, [])

  return (
    <div>

    </div>
  )
}

export default PubShow
