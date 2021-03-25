import express from 'express'
import { registerUser, loginUser } from '../controllers/auth.js'
import { addOnePub, deletePub, getAllPubs, getOnePub, updatePub } from '../controllers/pubs.js'
import { addOneUser, deleteUser, getAllUsers, getOneUser, updateUser } from '../controllers/user.js'
import { secureRoute } from './secureRoute.js'


const router = express.Router()


router.route('/users')
  .get(getAllUsers)
  .post(addOneUser)

router.route('/pubs')
  .get(getAllPubs)
  .post(secureRoute, addOnePub)

router.route('/users/:id')
  .get(getOneUser)
  .put(secureRoute, updateUser)
  .delete(secureRoute, deleteUser)


router.route('/pubs/:id')
  .get(getOnePub)
  .put(secureRoute, updatePub)
  .delete(secureRoute, deletePub)

router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)

export default router