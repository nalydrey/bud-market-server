import { Request, Response } from "express";
import { OrderService, orderService } from "../services/order.service.js";
import { CreateOrderDto } from "../dto/order/create-order.dto.js";
import { OrderItemService, orderItemService } from "../services/order-item.setvice.js";
import { OrderItem } from "../entity/order-item.entity.js";
import { UserService, userService } from "../services/user.service.js";
import { GetOrderDto } from "../dto/order/get-order-dto.js";
import { EditOrderDto } from "../dto/order/edit-order.dto.js";
import { ParamsDto } from "../dto/params/brand-params.dto.js";
import { User } from "../entity/user.entity.js";
import { ExtRequest } from "../models/ext-request.model.js";
import { Order } from "../entity/order.entity.js";



export class OrderController {

    constructor(
        private orderService: OrderService,
        private orderItemService: OrderItemService,
        private userService: UserService,
        ){}

    async getMany(req: Request, res: Response){

        const getDto = req.body as GetOrderDto

        const orders = await this.orderService.getMany(getDto)
        res.status(200).json({
            orders
        })
    }

    async create(req: ExtRequest, res: Response){
        console.log('!!!!!!!');
        console.log('!!!!!!!');
        console.log('!!!!!!!');
        console.log('!!!!!!!');
        
        try{
            const createOrderDto: CreateOrderDto = req.body
            let items: OrderItem[] = []
            const {email, firstName, lastName, phone, goods} = createOrderDto
            const user = req.user as User | undefined
            let order: Order | null = null
            if(!user){
                const orderItems = await Promise.all(goods.map(item => this.orderItemService.create(item)))
                orderItems.forEach(item => {if(item) items.push(item)})
            }
            if(user instanceof User){
                items = [...user.basket]
            }
            order = await this.orderService.create({email, firstName, lastName, phone, user, goods: items})
            console.log('!!!');
            
            if(order && user){
                console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                
                await this.userService.cleanBasket(user)
            }
            res.status(201).json({
                order
            })
        }
        catch(err){
            res.status(500).json({
                message: 'Замовлення не створене'
            })
        }
    }

    async edit(req: Request, res: Response){
        try{    
            const editDto = req.body as EditOrderDto & ParamsDto
            const order = await this.orderService.edit(editDto)
            res.status(200).json({
                order
            })
        }
        catch(err){
            res.status(500).json({
                message: 'Замовлення не редаговане'
            })
        }
    }

    async delete(req: Request, res: Response){
        try{
            console.log(req.body);
            
            const id = req.body.id as number
            await this.orderService.delete(id)
            res.status(200).json({
                success: true
            })
        }
        catch(err){
            console.log(err);
            
            res.status(500).json({
                message: 'Замоввлення не видалене'
            })
        }
    }
}

export const orderController = new OrderController(orderService, orderItemService, userService)