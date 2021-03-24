import User from '../models/user.js'

export const getAllUsers = async (req, res) => {
  const users = await User.find()
  console.log('🚀 ~ file: user.js ~ line 5 ~ getAllUsers ~ users', users)
  return res.status(200).json(users)
}

export const addOneUser = async (req, res) => {
  try {
    const newUser = { ...req.body, id: req._id }
    console.log('🚀 ~ file: user.js ~ line 12 ~ addOneUser ~ newUser', newUser)
    const userToAdd = await User.create(newUser)
    return res.status(201).json( { message: 'User succesfully created' }, userToAdd)
  } catch (error) {
    console.log('failed to add user')
    console.log(error)
    return res.status(422).json(error)
  }
}

export const getOneUser = async (req, res) => {
  try {
    const { id } = req.params
    const singleUser = await User.findById(id)
    if (!singleUser) {
      throw new Error('no User exists with that id')
    }
    return res.status(200).json(singleUser)
  } catch (err) {
    console.log('🆘 Something went wrong')
    console.log(err)
    return res.status(404).json({ 'message': 'Not found' })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params 
    const userToDelete = await User.findById(id)
    if (!userToDelete) throw new Error()
    await userToDelete.remove()
    return res.status(204).json({ 'message': 'item deleted' })
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const userToUpdate = await User.findById(id)
    if (!userToUpdate) throw new Error()
    Object.assign(userToUpdate, req.body)
    await userToUpdate.save()
    return res.status(202).json(userToUpdate)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ 'message': 'Not found' })
  }
}

