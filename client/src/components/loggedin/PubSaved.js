import React from 'react'

const PubSaved = () => {
  //this is the code i used in project 2 to store rated jokes into an array 
  //so thought it might be useful 

  const savedPubs = []
  const show10RatedPubs = () => {
    for (let i = 0; i < 20; i++) {
      const pub = localStorage.getItem(`pub${i}`)
      if (pub !== null) {
        savedPubs.push(pub)
      }
    }
  }
  show10RatedPubs()

  const clearPub = () => {
    localStorage.clear()
    location.reload()
  }
  console.log(clearPub)

  return (
    <div>

    </div>
  )
}

export default PubSaved
