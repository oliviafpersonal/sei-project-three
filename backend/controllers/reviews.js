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
    const newComment = { ...req.body, owner: userID }
    pub.comments.push(newComment)
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
    const { id, commentId } = req.params 
    const pub = await Pub.findById(id)
    if (!pub) throw new Error('Show not found')
    const commentToDelete = pub.comments.id(commentId) 
    if (!commentToDelete) throw new Error('Comment not found')
    if (!commentToDelete.owner.equals(userID)) throw new Error('Unauthorized')
    await commentToDelete.remove()
    await pub.save()
    return res.status(204).json()
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}
