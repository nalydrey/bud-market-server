import { Request, Response } from "express";
import { RegisterUserDto } from "../dto/user/register-user.dto.js";
import { UserService, userService } from "../services/user.service.js";
import { ProductService, productService } from "../services/product.service.js";
import { ChangeFavoriteDto } from "../dto/user/change-favorite.dto.js";
import { User } from "../entity/user.entity.js";
import { ChangeCompareDto } from "../dto/user/change-compare.dto.js";
import { LoginDto } from "../dto/user/login0user.dto.js";
import { ExtRequest } from "../models/ext-request.model.js";


export class UserController {

    constructor(private userService: UserService, private productService: ProductService){}

    async register(req: Request, res: Response){
        const createUserDto: RegisterUserDto = req.body
        await this.userService.registration(createUserDto)
        res.status(201).json({
            message: 'new user is registered'
        })
    }

    async login(req: ExtRequest, res: Response){
        try{
            const { password } = req.body as LoginDto
            const user = req.entity
            let token: string | null = null
            if(user instanceof User){
                token = await this.userService.login({user, password})
            }
            if(!token) throw new Error('Email or Password are wrong')
            res.status(200).json({
                token
            })
        }
        catch{
            res.status(500).json({
                message: 'Помилка при логінізації'
            })
        }
    }

    enter(req: ExtRequest, res: Response) {
        try{
            const user = req.user

            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            console.log(user);
            
            

            if(!user) throw new Error('No user')
            res.status(200).json({
                user: req.user
            })
        }
        catch{
            res.status(500).json({
                message: 'Помилка при вході'
            })
        }
        
        
    }

    async changeFavourite(req: Request, res: Response){
        const changeFavoriteDto: ChangeFavoriteDto = req.body
        const {productId} = changeFavoriteDto
        const user = req.user as User
        const product = await this.productService.getOne(productId)
        if(product){
            await this.userService.changeFavourites(user, product)
            res.status(200).json({
                message: 'favorite products were changed'
            })
        }
    }

    async changeCompare (req: Request, res: Response) {
        const changeCompareDto: ChangeCompareDto = req.body
        const {productId} = changeCompareDto
        const user = req.user as User
        const product = await this.productService.getOne(productId)
        if(product){
            await this.userService.changeCompare(user, product)
            res.status(200).json({
                message: 'compared products were changed'
            })
        }
    }

    async delete(req: Request, res: Response){
        await this.userService.delete(+req.params.id)
        res.status(200).json({
            success: true
        })
    }

    async update(req: Request, res: Response){

    }

    async getOne(req: Request, res: Response){
        const user = await this.userService.getOne(+req.params.id)
        res.status(200).json({
            user
        })
    }

    async getMany(req: Request, res: Response){
        const users = await this.userService.getMany()
        res.status(200).json({
            users
        })
    }
}

export const userController = new UserController(userService, productService)