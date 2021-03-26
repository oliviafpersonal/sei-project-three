import Pub from '../models/pub.js'
import User from '../models/user.js'


export const getAllPubs = async (req, res) => {
  const pubs = await Pub.find()
  //console.log('🚀 ~ file: pubs.js ~ line 6 ~ getAllPubs ~ pubs', pubs)
  return res.status(200).json(pubs)
}
export const addOnePub = async (req, res) => {
  try {
    const userID = req.currentUser._id
    const findUser = await User.findById(userID)
    if (!findUser.isLandlord) { 
      throw new  Error('Only Landlords can add pubs')
    } else console.log('>>>>>>>> user is a landlord, access approved')
    const newPub = { ...req.body, id: req._id }
    //console.log('🚀 ~ file: pubs.js ~ line 14 ~ addOnePub ~ newPub', newPub)
    const pubToAdd = await Pub.create(newPub)
    return res.status(201).json(pubToAdd)
  } catch (error) {
    console.log('failed to add pub')
    console.log(error)
    return res.status(422).json(error)
  }
}

export const getOnePub = async (req, res) => {
  try {
    const { id } = req.params
    const singlePub = await Pub.findById(id).populate('owner')
    if (!singlePub) {
      throw new Error('no Pub exists with that id')
    }
    return res.status(200).json(singlePub)
  } catch (err) {
    console.log('🆘 Something went wrong')
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}


export const deletePub = async (req, res) => {
  try {
    const userID = req.currentUser._id
    const findUser = await User.findById(userID)
    if (!findUser.isLandlord) { 
      throw new  Error('Only Landlords can update pubs')
    } else console.log('>>>>>>>>>>> user is a landlord, access approved')
    const { id } = req.params 
    const pubToDelete = await Pub.findById(id)
    if (!pubToDelete) {
      throw new Error('no pub exists with this id')
    }
    await pubToDelete.remove()
    return res.status(200).json({ message: 'its all gone' })
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}

export const updatePub = async (req, res) => {
  try {
    const userID = req.currentUser._id
    const findUser = await User.findById(userID)
    if (!findUser.isLandlord) { 
      throw new  Error('Only Landlords can update pubs')
    } else console.log('user is a landlord, access approved')
    const { id } = req.params
    const pubToUpdate = await Pub.findById(id)
    if (!pubToUpdate) {
      throw new Error('no pub with that id exists...')
    }
    Object.assign(pubToUpdate, req.body)
    await pubToUpdate.save()
    return res.status(202).json(pubToUpdate)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}
