// import { isEqual } from 'lodash.js'
import Pub from '../models/pub.js'
import User from '../models/user.js'

export const getAllUsers = async (req, res) => {
  const users = await User.find()
  //console.log('🚀 ~ file: user.js ~ line 5 ~ getAllUsers ~ users', users)
  return res.status(200).json(users)
}

export const addOneUser = async (req, res) => {
  try {
    const newUser = { ...req.body, id: req._id }
    console.log('🚀 ~ file: user.js ~ line 12 ~ addOneUser ~ newUser', newUser)
    const userToAdd = await User.create(newUser)
    return res.status(201).json( { userToAdd })
    
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
    if (!userToDelete) throw new Error('cannot find user')
    await userToDelete.remove()
    return res.status(204).json({ message: 'item deleted' })
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

export const addPubToFavs = async (req, res) => {
  try {
    const userID = req.params.id
    const findUser = await User.findById(userID)
    if (!findUser) throw new Error('No User exists with that ID')
    const pubID = req.params.pubID
    const pub = await Pub.findById(pubID)
    findUser.favouritePubs.push(pub)
    await findUser.save()
    return res.status(200).json(findUser.favouritePubs)
  } catch (error) {
    console.log(error)
    return res.status(404).json({ message: error.message })
  }  
}

// export const deletePubFromFavs = async (req, res) => {
//   try {
//     const userID = req.params.id
//     const findUser = await User.findById(userID)
//     if (!findUser) throw new Error('No User exists with that ID')
//     const pubID = req.params.pubID
//     const favPub = Pub.findById(pubID)
//     await findUser.favouritePubs.filter(pub => isEqual(pub, favPub))
//     await findUser.save()
//     return res.status(204).json('deleted pub')
//   } catch (err) {
//     console.log(err)
//     return res.status(404).json({ message: err.message })
//   }
// }