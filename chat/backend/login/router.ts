import {Router} from 'express'
import signIn from './login'
const router : Router = Router()

router.post('/login', signIn)


export default router