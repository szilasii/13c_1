import { Request,Response } from "express";
export default function auth(req:Request,res:Response,next:any) {
    console.log('Auth')
    next()
}