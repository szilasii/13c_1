import {Request,Response} from 'express'
import mysql from 'mysql2'
import dbConfig from '../app/config'
import { U, User } from './user'

export function getUser(req:Request,res:Response) {
    const conn = mysql.createConnection(dbConfig)
    

    conn.connect((err)=> {
        if (err) throw err
        console.log('Sikeres csatlakozás')
    })
    conn.query('Select userid from users where userId = ?',[1],(err,result:any)=>{
        if (err) throw err
        type ut = "Guest" | "Admin" | "Aut"
        const valaki = new U<string>("Guest")
        const masvalaki = new U<ut>("Aut")

        console.log(valaki.userType)
        console.log(masvalaki.userType)
        // const user : User = new User(<User>result[0])
        // res.send(user.UserId)
    })
}