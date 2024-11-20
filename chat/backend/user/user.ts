import mysql from 'mysql2/promise'
import dbConfig from '../app/config'
export interface IUser {
    Name?: string   
    Email?: string
    UserId?: number
    PhoneNumber?: string
    PassWord?: string
    Token?:string
}


export class User implements IUser {
    Name?: string 
    Email?: string
    UserId?: number
    PhoneNumber?: string
    PassWord?: string
    Token?:string
    
    constructor() {
      
    }
    
        nagybetu : any = () => {
        return this.Name?.toLocaleUpperCase()
         
    }   
    set name(name:string) {
        this.Name = name
    }
    osszesadat : any = () => {
        return this
    }   
     async loadUserFromDB(id:number) : Promise<boolean> {
       try {
        const conn =  await mysql.createConnection(dbConfig)
        const [rows] :any = await conn.execute('Select * from users where UserId = ?', [id])
            Object.assign(this,  rows[0]) 
        return true
        } catch (err) {
            console.log(err)
            return false
        }   
    }
    static async validUser(Email:string,PassWord:string): Promise<number> {
        try {
            const sql : string = 'select login(?,?) as UserId'
            const conn = await mysql.createConnection(dbConfig)
            const [rows] :any = await conn.execute(sql,[Email,PassWord])
            console.log(rows)
            return rows[0].UserId
        } catch {
            return 0
        }

    }

}


// export class User {
//     userId?: number
//     names: string
//     email: string
//     phoneNumber? : string
//     password? : string

//     constructor (
//         names:string,
//         email:string,
//         userId?: number,
//         phoneNumber? : string,
//         password? : string) {
//         this.names = names
//         this.email = email
//         this.userId = userId
//         this.phoneNumber = phoneNumber
//         this.password = password
//     }
// }
