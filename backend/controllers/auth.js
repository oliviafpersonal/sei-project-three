import User from '../models/user.js'

export const registerUser = async () (req, res) => {

  try {

    const newUser = await User.create(req.body)
    return res.status(202).json({ message: `Welcome ${ newUser.username }`})
  } catch (error) {
  console.log('🚀 ~ file: auth.js ~ line 12 ~ registerUser ~ error', error)
  return res.stauts(422).json(error)
}