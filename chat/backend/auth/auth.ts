import { Request,Response } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export default function auth(req:Request,res:any,next:any) {
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    if (!token) {
        res.status(401).send({error:"Token szükséges a hozzáféréshez!!!"})
        return
    }
    const {JWT_STRING} = process.env
    if(!JWT_STRING) {
        res.status(401).send({error:"Hiba történt a token ellenőrzésekor"})
        return 
    }
    try {
        const decodedToken = jwt.verify(token,JWT_STRING)
        res.decodedToken = decodedToken
        next()
    }
    catch {
        res.status(401).send({error:"Hibás token!"})
        return
    }
}