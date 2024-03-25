import { myDataSource } from "../data-source/data-source.init.js"
import { LoginDto } from "../dto/user/login0user.dto.js"
import { Product } from "../entity/product.entity.js"
import { User } from "../entity/user.entity.js"
import bcrypt from 'bcryptjs'
import { RegistrationData } from "../models/services/user_service/registration-data.model.js"
import { LoginData } from "../models/services/user_service/login-data.model.js"
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../constants/jwt_secret.js"

const repo = myDataSource.getRepository(User)

export class UserService {

    getUserByEmail (email: string) {
        return repo.findOneBy({email})
    }

    async registration(registrationDate: RegistrationData){
        const {password} = registrationDate
       const user = new User()

       registrationDate.email === process.env.ADMIN_EMAIL 
        ? user.role = 'admin'
        : user.role = 'user'

        const salt = await bcrypt.genSalt(7)
        const passwordHash = await bcrypt.hash(password, salt) 

       Object.assign(user, registrationDate, {password: passwordHash})
       return repo.save(user)
    }

    async login(loginData: LoginData) {
        const {password, user} = loginData
        const secret = process.env.JWT_SECRET || JWT_SECRET
        const {id, email} = user
        const isProperPassword = await bcrypt.compare(password, user.password)
        if(isProperPassword){
            return jwt.sign({id, email}, secret, {expiresIn: '1h'})
        }
        return null
    }

    
    async update(){

    }

    async delete(id: number){
        return repo.delete(id)
    }

    async getOne(id: number){
        return repo.findOneBy({id})
    }

    async getMany(){
        return repo.find()
    }

    async changeFavourites(user: User, product: Product) {
            user.favorite = user.favorite.some(item => item.id === product.id ) 
            ? user.favorite.filter(item => item.id !== product.id)
            :  [...user.favorite, product]
            return repo.save(user)
    }
 
    async changeCompare(user: User, product: Product) {
            user.compare = user.compare.some(item => item.id === product.id ) 
            ? user.compare.filter(item => item.id !== product.id)
            :  [...user.compare, product]
            return repo.save(user)
    }

    cleanBasket(user: User){
        user.basket = []
        return repo.save(user)
    }
}

export const userService = new UserService()