import React from 'react'
import drinks from '../../styles/assets/drinks.png'

// const { Client } = require('@ideal-postcodes/core-axios')
// const client = new Client({ api_key: 'ak_kmtc4fdm8RWTEGal0A9zsXeRXQm0s' })

// const findAddress = async () => {
//   const { IdpcRequestFailedError } = Client.errors

//   try {
//     const address = await client.lookupAddress({ query: 'N13 4NT' })
//     console.log(address)
//   } catch (error) {
//     if (error instanceof IdpcRequestFailedError) {
//       // IdpcRequestFailedError indicates a 402 response code
//       // Possibly the key balance has been depleted
//     }
//   }
// }

// findAddress()

const LandLordSignUp = () => {
  return (
    <div className="landlord-sign-container container">
      <div className="columns">
        <div className="landlord-sign-up column">
          <h1>Hi, Username! Lets get started Listing your Pub</h1>
          <br></br>
          <b>STEP 1</b>
          <h2>Where is your Pub located?</h2>
          <br />
          <form>
            <input className="input"></input>
            <br />
            <button className="button">Continue</button>
          </form>
        </div>
        <div className="column">
          <img src={drinks}></img>
        </div>
      </div>
    </div>
  )
}

export default LandLordSignUp
