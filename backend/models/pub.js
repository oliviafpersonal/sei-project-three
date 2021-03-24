import mongoose from 'mongoose'

const pubSchema = new mongoose.Schema({
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
  image: { type: String, required: true }
})

export default mongoose.model('Pub', pubSchema)