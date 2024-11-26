import { Request,Response } from "express"
import { User } from "../user/user"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export default async function signIn(req:Request,res:Response) {

const user:User = new User()
Object.assign(user,req.body)
if (!user.Email || !user.PassWord) {
    res.status(400).send({error:'Hiányzó felhasználónév vagy jelszó'})
    return
}
const UserId : number  = await User.validUser(user.Email,user.PassWord)
if(UserId==0) {
    res.status(401).send({error:"Hibás email és jelszó!"})
    return
}
if (!await user.loadUserFromDB(UserId))
{
    res.status(401).send({error:"A bejelentkezés nem sikerült"})
    return 
}

const payload = {UserId:user.UserId}
const {JWT_STRING} = process.env
if(!JWT_STRING) {
    res.status(401).send({error:"Hiba történt a token létrehozásakor"})
    return 
}

user.Token = jwt.sign(payload,JWT_STRING,{expiresIn:"2h"})
user.PassWord = undefined
res.status(200).send({succes:"Sikeres bejelentkezés",user:user})
}