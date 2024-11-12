import app from "./app"
import dotenv from 'dotenv'
dotenv.config()
const {PORT} = process.env

app.get('/',(req,res)=>{
    res.send('A szerver fut!')
})

app.listen(3000, ()=>{
    console.log(`A szerver a ${PORT}-es porton fut `)
})
