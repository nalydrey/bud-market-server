import { Request, Response } from "express";
import { OrderService, orderService } from "../services/order.service.js";
import { CreateOrderDto } from "../dto/order/create-order.dto.js";
import { OrderItemService, orderItemService } from "../services/order-item.setvice.js";
import { OrderItem } from "../entity/order-item.entity.js";


export class OrderController {

    constructor(
        private orderService: OrderService,
        private orderItemService: OrderItemService
        ){}

    async getMany(req: Request, res: Response){
        const orders = await this.orderService.getMany()
        res.status(200).json({
            orders
        })
    }

    async create(req: Request, res: Response){
        const createOrderDto: CreateOrderDto = req.body
        const filterGoods: OrderItem[] = []
        const goods = await Promise.all(createOrderDto.goods.map(item => this.orderItemService.create(item)))
        goods.forEach(element => {
            if(element) filterGoods.push(element)
        }) 
        const createOrderData = {...createOrderDto, goods: filterGoods}
        const order = this.orderService.create(createOrderData)
        res.status(201).json({
            order
        })
    }

    async delete(req: Request, res: Response){
        const isDeleted = await this.orderService.delete(+req.params)
        res.status(200).json({
            success: true
        })
    }
}

export const orderController = new OrderController(orderService, orderItemService)