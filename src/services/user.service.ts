import { myDataSource } from "../data-source/data-source.init.js"
import { CreateUserDto } from "../dto/user/create-user.dto.js"
import { LoginDto } from "../dto/user/login0user.dto.js"
import { Product } from "../entity/product.entity.js"
import { User } from "../entity/user.entity.js"

const repo = myDataSource.getRepository(User)

export class UserService {

    async create(createUserDto: CreateUserDto){
       const user = new User()
       console.log(process.env.ADMIN_EMAIL);
       createUserDto.email === process.env.ADMIN_EMAIL 
        ? user.role = 'admin'
        : user.role = 'user'
       Object.assign(user, createUserDto)
       return repo.save(user)
    }

    login(loginDto: LoginDto) {
        const {email, password} = loginDto
        return repo.findOneBy({
            email, 
            password
        })
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

    async changeFavourites(userId: number, product: Product) {
        
        const user = await this.getOne(userId)
        if(user){
            user.favorite = user.favorite.some(item => item.id === product.id ) 
            ? user.favorite.filter(item => item.id !== product.id)
            :  [...user.favorite, product]
            return repo.save(user)
        }
    }
 
    async changeCompare(userId: number, product: Product) {
        
        const user = await this.getOne(userId)
        if(user){
            user.compare = user.compare.some(item => item.id === product.id ) 
            ? user.compare.filter(item => item.id !== product.id)
            :  [...user.compare, product]
            return repo.save(user)
        }
    }
}

export const userService = new UserService()