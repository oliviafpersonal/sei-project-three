import mongoose from 'mongoose'
import reviewSchema from './reviews.js'
import axios from 'axios'

const pubSchema = new mongoose.Schema(
  {
    nameOfPub: { type: String, required: true },
    address: {
      line1: { type: String, required: true },
      line2: { type: String },
      town: { type: String },
      city: { type: String, required: true },
      postCode: { type: String, required: true, maxlength: 10 }
    },
    description: { type: String },
    isOutsideSeating: { type: Boolean, required: true },
    isPetFriendly: { type: Boolean, required: true },
    isFoodServed: { type: Boolean, required: true },
    isLiveSports: { type: Boolean, required: true },
    image: { type: String, default: 'no image provided' },
    pubOwner: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    reviews: [reviewSchema]
  },
  { timestamps: true }
)

pubSchema.set('toJSON', { virtuals: true })

pubSchema
  .virtual('averageRatings')
  .get(function () {
    const review = this.reviews
    function averageTotal () {
      const ratingsArray = review.map((rating) => {
        return rating.overallRating
      })
      const sum = ratingsArray.reduce((acc, curr) => {
        return acc + curr
      }, 0)
      const average = sum / ratingsArray.length
      return !average ? 'is not yet rated' : average

    }
    function averagePrice () {
      const priceArray = review.map(rating => {
        return rating.subRating.price
      })
      const sum = priceArray.reduce((acc, curr) => {
        return acc + curr
      }, 0)
      const average = sum / priceArray.length
      return !average ? 'is not yet rated' : average
    }
    function averageAvailability() {
      const availabilityArray = review.map(rating => {
        return rating.subRating.availability
      })
      const sum = availabilityArray.reduce((acc, curr) => {
        return acc + curr
      }, 0)
      const average = sum / availabilityArray.length
      return !average ? 'is not yet rated' : average
  
    }
    function averageComfortability () {
      const comfortabilityArray = review.map(rating => {
        return rating.subRating.comfortability
      })
      const sum = comfortabilityArray.reduce((acc, curr) => {
        return acc + curr
      }, 0)
      const average = sum / comfortabilityArray.length
      return !average ? 'is not yet rated' : average
    }
    
    return {
      averageOverall: averageTotal(),
      averagePrice: averagePrice(),
      averageAvailability: averageAvailability(),
      averageComfortability: averageComfortability()
    }
  })

pubSchema
  .virtual('locationCoordinates')
  .get( async function () {
    const input = this.address.postCode
    
    if (!input) return null
    
    const externalData = async () => {
      const { data } = await axios.get(`http://api.getthedata.com/postcode/${input}`)
      const lat =  data.data.latitude
      const long = data.data.longitude
      console.log(lat, long)
      return { longitude: Number(long), latitude: Number(lat) }
    }
    const coordinateObject = await externalData()
    console.log('🚀 ~ file: pub.js ~ line 100 ~ coordinateObject', coordinateObject)
    
    return coordinateObject
  })
  



export default mongoose.model('Pub', pubSchema)
