import express from 'express'
import { registerUser } from '../controllers/auth.js'
import { addOnePub, deletePub, getAllPubs, getOnePub, updatePub } from '../controllers/pubs.js'
import { addOneUser, deleteUser, getAllUsers, getOneUser, updateUser } from '../controllers/user.js'


const router = express.Router()


router.route('/users')
  .get(getAllUsers)
  .post(addOneUser)

router.route('/pubs')
  .get(getAllPubs)
  .post(addOnePub)

router.route('/users/:id')
  .get(getOneUser)
  .put(updateUser)
  .delete(deleteUser)


router.route('/pubs/:id')
  .get(getOnePub)
  .put(updatePub)
  .delete(deletePub)

router.route('/register')
  .post(registerUser)

export default router