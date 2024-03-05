import { Request, Response } from "express";
import { CreateUserDto } from "../dto/user/create-user.dto.js";
import { UserService, userService } from "../services/user.service.js";
import { ProductService, productService } from "../services/product.service.js";
import { ChangeFavoriteDto } from "../dto/user/change-favorite.dto.js";
import { User } from "../entity/user.entity.js";
import { ChangeCompareDto } from "../dto/user/change-compare.dto.js";


export class UserController {

    constructor(private userService: UserService, private productService: ProductService){}

    async register(req: Request, res: Response){
        const createUserDto: CreateUserDto = req.body
        await this.userService.create(createUserDto)
        res.status(201).json({
            message: 'new user is registered'
        })
    }

    async login(req: Request, res: Response){
        const email: string | undefined = req.query.email as string | undefined
        const password: string | undefined = req.query.password as string | undefined
        let user: User | null = null
        if(email && password){
            user = await this.userService.login({email, password})
        }
        res.status(200).json({
            user
        })
        
    }

    async changeFavourite(req: Request, res: Response){
        const changeFavoriteDto: ChangeFavoriteDto = req.body
        const {productId, userId} = changeFavoriteDto
        const product = await this.productService.getOne(productId)
        if(product){
            await this.userService.changeFavourites(userId, product)
            res.status(200).json({
                message: 'favorite products were changed'
            })
        }
    }

    async changeCompare (req: Request, res: Response) {
        const changeCompareDto: ChangeCompareDto = req.body
        const {productId, userId} = changeCompareDto
        const product = await this.productService.getOne(productId)
        if(product){
            await this.userService.changeCompare(userId, product)
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