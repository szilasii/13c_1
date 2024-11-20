import {Router} from 'express'
import * as user from './user_model'
import auth from '../auth/auth'
const router : Router = Router()

router.get('/user', user.getUser)
router.get('/user/:id', user.getUser)
router.post('/user',auth,user.addUser)
router.put('/user/:UserId',auth,user.updateUser)
router.delete('/user/:id',auth,user.deleteUser)

export default router