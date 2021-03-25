<<<<<<< HEAD
import React, { /*useState, useEffect */ } from 'react'
//import axios from 'axios'

//import PubCard from './PubCard'

const PubIndex = () => {
  /*
  const [pubs, setPubs] = useState('')

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('')
      setPubs(data)
    }
    getData()
  }, [])
  */

  return (
    <div>
      <h2>Hello</h2>
      <div>

      </div>



    </div>

  )

}

export default PubIndex
=======
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PubIndex = () => {
  const [pubs, setPubs] = useState(null)
  useEffect( async () => {
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
>>>>>>> 8201d077a69d5b8fca89b89bc1cba481b58af7fc
