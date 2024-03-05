import { myDataSource } from "../data-source/data-source.init.js"
import { Order } from "../entity/order.entity.js"

const repo = myDataSource.getRepository(Order)

type CreateOrderData = Omit<Order, 'createdDate' | 'updatedDate' | 'id'>  

export class OrderService {


    getMany() {
        return repo.find()
    }

    create(createOrderData: CreateOrderData) {
        const order = new Order()
        Object.assign(order, createOrderData)
        return repo.save(order)
    }

    delete(id: number) {
        return repo.delete(id)
    }
}

export const orderService = new OrderService()