import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  subRating: {
    price: { type: Number, required: true },
    availability: { type: Number, required: true },
    comfortability: { type: Number, required: true }
  },
  text: { type: String, maxlength: 300, default: 'No comments submitted' },
  reviewOwner: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
  reviewOwnerName: { type: String, ref: 'User' },
  reviewOwnerImage: { type: String, ref: 'User' },
  pubName: String,
  pubID: String
}, {
  timestamps: true
})

reviewSchema
  .set('toJSON', { virtuals: true })

reviewSchema
  .virtual('overallRating')
  .get(function() {
    const ratingsArray = Object.values(this.subRating)
    const sum = ratingsArray.reduce((acc, curr) => {
      return acc + curr
    }, 0)
    const average = sum / ratingsArray.length
    return !average ? 'Not Rated' : average
  })

export default reviewSchema