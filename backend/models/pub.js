import mongoose from 'mongoose'
import reviewSchema from './reviews.js'

const pubSchema = new mongoose.Schema(
  {
    nameOfPub: { type: String },
    address: {
      line1: { type: String },
      line2: { type: String },
      town: { type: String },
      city: { type: String },
      postCode: { type: String, maxlength: 10 }
    },
    description: { type: String },
    isOutsideSeating: { type: Boolean },
    isPetFriendly: { type: Boolean },
    isFoodServed: { type: Boolean },
    isLiveSports: { type: Boolean },
    image: { type: String },
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


// // function getAverage (ratingToCalculateAverage) {
// //   const ratingsArray = this.reviews.map((rating) => {
// //     return rating.ratingToCalculateAverage
// //   })
// //   const sum = ratingsArray.reduce((acc, curr) => {
// //     return acc + curr
// //   }, 0)
// //   const average = sum / ratingsArray.length
// //   return !average ? 'is not yet rated' : average
// // }
// pubSchema
//   .virtual('averageRatingPrice')
//   .get(function () {
    
//     return {

//     }


//   })
// pubSchema
//   .virtual('averageRatingAvailability')
//   .get(
//   })
// pubSchema
//   .virtual('averageRatingComfortability')
//   .get(function () {
//     const comfortabilityArray = this.reviews.map(rating => {
//       return rating.subRating.comfortability
//     })
//     const sum = comfortabilityArray.reduce((acc, curr) => {
//       return acc + curr
//     }, 0)
//     const average = sum / comfortabilityArray.length
//     return !average ? 'is not yet rated' : average

//   })


export default mongoose.model('Pub', pubSchema)
