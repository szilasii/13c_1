import {Request,Response} from 'express'
import { User,IUser } from './user'
import mysql from 'mysql2'
import dbConfig from '../app/config'
import mysqlP from 'mysql2/promise'
export async function  getUser(req:Request,res:Response) {
    if (!req.params.id) {
        res.status(401).send({error:"Hiányzó patraméter"})
        return
    }
    const user: User = new User();
    await user.loadUserFromDB(parseInt(req.params.id as string))
    if (!user.Name) {
        res.status(404).send({error: "Nincs ilyen adat"})
        return
    }

    res.status(200).send(user.osszesadat())  
}

export async function  deleteUser(req:Request,res:Response) {
    if (!req.params.id) {
        res.status(401).send({error:"Hiányzó patraméter"})
        return
    }
    let conn = mysql.createConnection(dbConfig)
        conn.connect((err)=>{
            if (err) {
                res.status(500).send({error: "Nem sikerült csatlakozni az adatbázishoz!"})
                return
            }
        })
        conn.query('delete from users where UserId = ?',[req.params.id],(err,result:any) => {
            if (err) {
                res.status(500).send({error: "Hiba az adatok lekérdezése során!"})
                return
            }
           if (result?.affectedRows < 1) {
            res.status(404).send({error: "Nem létező felhasználó"})
            return
           }
            res.status(200).send({success: 'A felhasználó törölve lett'})
        })  
}
export async function  addUser(req:Request,res:any) {
    
    try {
        const user : IUser = req.body as IUser
        const conn = await mysqlP.createConnection(dbConfig)
        const [rows] :any = await conn.execute('insert into users values (null,?,?,?,?)',[user.Name,user.Email,user.PhoneNumber,user.PassWord])
        user.UserId = rows.insertId
        user.PassWord = undefined
        res.status(201).send({message:'sikeres adatrögzítés',data:user as IUser})
        
    } 
    catch(error:any) {
        switch (error.errno) {
            case  1062 : res.status(403).send({error:{message:'Már létező email cím',err:error}}); break;
            default: res.status(500).send({error:{message:'Hiba az adatrögzítéskor!',err:error}})
        }
    }
}
export async function updateUser(req:Request,res:any) {
    console.log(res.decodedToken)
    if (!res.decodedToken.UserId) {
        res.status(401).send({error:"Nincs jogosultsága a modosításra"})
            return 
    }
    
    // if (!req.params.UserId) {
    //     res.status(401).send({error:"Hiányzó patraméter"})
    //     return
    // }
           
    const oldUser :User = new User()
    const siker = await oldUser.loadUserFromDB(parseInt(res.decodedToken.UserId as string))
    let user :User = oldUser as User
    Object.assign(user,req.body)
   
    if (!siker || !user.Name) {
        res.status(404).send({error: "A felhasználó nem létezik!"})
        return
    }
   
    let conn = mysql.createConnection(dbConfig)
        conn.connect((err)=>{
            if (err) {
                res.status(500).send({error: "Nem sikerült csatlakozni az adatbázishoz!"})
                return
            }
        })
        conn.query('Update users set Name =?,Email=?, PhoneNumber=? where UserId =?',[user.Name,user.Email,user.PhoneNumber,req.params.UserId],(err,result:any) => {
            if (err) { 
                res.status(500).send({error: "Hiba az adatok mentése során!"})
                return
            }
           if (result?.affectedRows < 1) {
            res.status(404).send({error: "Nem lett módosítva a felhasználó"})
            return
           }
            res.status(200).send({success: user})
        })  
}