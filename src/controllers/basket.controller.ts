import { NextFunction, Request, Response } from "express";
import { BasketService, basketService } from "../services/basket.service.js";
import { CreateOrderItemDto } from "../dto/order-item/create-order-item.dto.js";
import { User } from "../entity/user.entity.js";
import { ParamsDto } from "../dto/params/brand-params.dto.js";


export class BasketController {

    constructor (private basketService: BasketService) {}

    async addItem(req: Request, res: Response){
        try{
            const {productId} = req.body as CreateOrderItemDto
            const user = req.user as User
            const item = await this.basketService.addItem({user, productId})
            res.status(201).json({
                item
            })
        }
        catch(err){
            console.log(err);
            res.status(500).json({
                message: 'Елемент не доданий до кошика'
            })
        }
    }

    async incrQty (req: Request, res: Response) {
        try {
            const {id} = req.body as ParamsDto
            const item = await this.basketService.incrQty(id)
            console.log(item);
            res.status(200).json({
                item
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Кількість товарів не збільшена'
            })
        }
    }

    async decrQty (req: Request, res: Response) {
        try {
            const {id} = req.body as ParamsDto
            const item = await this.basketService.decrQty(id)
            console.log(item);
            res.status(200).json({
                item
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Кількість товарів не зменшена'
            })
        }
    }

    async deleteItem (req: Request, res: Response) {
        try {
            console.log('!!!!!!!!!!!!!!!!!!!!!');
            
            const {id} = req.body as ParamsDto
            console.log(id);
            
            const item = await this.basketService.deleteItem(id)
            console.log('item',item);
            res.status(200).json({
                item
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Товар не видалений з кошика'
            })
        }
    }

    async getBasket (req: Request, res: Response) {
        try {
            const user = req.user as User
            const items = await this.basketService.getBasket(user)
            // console.log(items);
            res.status(200).json({
                items
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Неможливо отримати кошик'
            })
        }
    }

    async alreadyExist (req: Request, res: Response, next: NextFunction){
        try{
            const {productId} = req.body as CreateOrderItemDto
            const user = req.user as User
            const isExist = await this.basketService.aleadyInBasket({productId, user})
            console.log(isExist);
            if(isExist) throw new Error('already exist')
            next()
        }
        catch{
            res.status(500).json({
                message: 'Цей товар вже в кошику'
            })
        }
    }
}

export const basketController = new BasketController(basketService)