import Pub from '../models/pub.js'
import User from '../models/user.js'


export const addReviewtoPub = async (req, res) => {
  try {
    const userID = req.currentUser._id
    const findUser = await User.findById(userID)
    if (findUser.isLandlord) { 
      throw new  Error('user is a Landlord, Landlords cannot review pubs')
    } else console.log('user is not a landlord, access approved')
    const { id } = req.params 
    const pub = await Pub.findById(id)
    if (!pub) throw new Error('Cannot find pub')
    const newReview = { ...req.body, owner: userID }
    pub.reviews.push(newReview)
    await pub.save()
    return res.status(200).json(pub)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
} 


export const deletePubReview = async (req, res) => {
  try {
    const userID = req.currentUser._id
    const findUser = await User.findById(userID)
    if (findUser.isLandlord) { 
      throw new  Error('user is a Landlord, Landlords cannot remmove pub reviews')
    } else console.log('user is not a landlord, access approved')
    const { id, reviewId } = req.params 
    const pub = await Pub.findById(id)
    if (!pub) throw new Error('Show not found')
    const reviewToDelete = pub.reviews.id(reviewId) 
    if (!reviewToDelete) throw new Error('Comment not found')
    if (!reviewToDelete.owner.equals(userID)) throw new Error('Unauthorized')
    await reviewToDelete.remove()
    await pub.save()
    return res.status(204).json()
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}

export const updatePubReview = async (req, res) => {
  try {
    const userID = req.currentUser._id
    const findUser = await User.findById(userID)
    if (findUser.isLandlord) { 
      throw new  Error('user is a Landlord, Landlords cannot remmove pub reviews')
    } else console.log('user is not a landlord, access approved')

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