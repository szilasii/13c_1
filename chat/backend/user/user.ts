export class User {
    Name: string = "Maci Laci"   
    Email?: string
    UserId?: number
    PhoneNumber?: string
    PassWord?: string
    
    constructor(init:User) {
        Object.assign(this, init);
    }
        nagybetu : any = () => {
        return this.Name.toLocaleUpperCase()
         
    }   
    osszesadat : any = () => {
        return this
    }   
   

}

export class U<T> {
    readonly userType : T
    username = ""
    protected age!:number
    constructor (userType:T) {
        this.userType = userType
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