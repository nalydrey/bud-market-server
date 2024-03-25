import { Request, Response } from "express";
import { CreateOrderItemDto } from "../dto/order-item/create-order-item.dto.js";
import { OrderItem } from "../entity/order-item.entity.js";
import { User } from "../entity/user.entity.js";
import { OrderItemService, orderItemService } from "./order-item.setvice.js";
import { myDataSource } from "../data-source/data-source.init.js";
import { Equal, In } from "typeorm";


interface BasketData {
    productId: number
    user: User
}




const orderItemRepo = myDataSource.getRepository(OrderItem)

export class BasketService {

    constructor(private orderItemService: OrderItemService){}

    async addItem(basketData: BasketData) {
      const {productId, user} = basketData
      const item = await this.orderItemService.create({productId, qty: 1})
      if(item){
        item.usersBasket = user
        return orderItemRepo.save(item)
      } 
    }

    incrQty(itemId: number){
        return orderItemRepo.increment({id: itemId}, 'qty', 1)
    }
   
    decrQty(itemId: number){
        return orderItemRepo.decrement({id: itemId}, 'qty', 1)
    }

    deleteItem(itemId: number){
        return orderItemRepo.delete(itemId)
    }

    async getBasket(user: User){

        console.log(user);
        

        return orderItemRepo.find({
            where: {
                usersBasket: {
                    id: user.id
                }
            }
        })
        
    }

    async aleadyInBasket (basketData: BasketData) {
        const {productId, user} = basketData
        console.log('Already Exist');
        console.log(productId);
        
        
        const item = await orderItemRepo.findOneBy({
            usersBasket: {
                id: user.id
            },
            product: {
                id: productId
            }
        })

        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!');
        console.log(item);
        
        

        return item ? true : false
    }
}

export const basketService = new BasketService(orderItemService)