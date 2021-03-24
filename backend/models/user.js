import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, maxlength: 40 },
  email: { type: String, unique: true },
  password: { type: String },
  profileImage: { type: String },
  isLandlord: { type: Boolean }
  //*has access to comments, can CRUD comments and self
})


export default mongoose.model('User', userSchema)