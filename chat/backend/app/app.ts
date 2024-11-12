import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import userRouter from '../user/router'

const app = express()

app.use(cors({origin: '*'}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api',userRouter)

export default app;