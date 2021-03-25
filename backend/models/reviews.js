import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  subRating: {
    price: { type: Number },
    availability: { type: Number },
    comfortability: { type: Number }
  },
  text: { type: String, maxlength: 300 },
  owner: { type: mongoose.Schema.Types.ObjectID, ref: 'User' }
}, {
  timestamps: true
})


reviewSchema
  .virtual('overallRating')
  .get(function() {
    const ratingsArray = Object.keys(this.subRating)
    const sum = ratingsArray.reduce((acc, curr) => {
      return acc + curr
    }, 0)
    return sum / ratingsArray.length
  })


export default reviewSchema