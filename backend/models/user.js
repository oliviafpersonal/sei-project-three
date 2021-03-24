import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxlength: 40 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String, required: true },
  isLandlord: { type: Boolean, required: true }
  //*has access to comments, can CRUD comments and self
})


export default mongoose.model('User', userSchema)