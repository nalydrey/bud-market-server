import { myDataSource } from "../data-source/data-source.init.js"
import { OrderItem } from "../entity/order-item.entity.js"
import { Order } from "../entity/order.entity.js"
import { Product } from "../entity/product.entity.js"
import { User } from "../entity/user.entity.js"

const repo = myDataSource.getRepository(Order)

interface CreateOrderData {
    firstName: string
    lastName: string
    email: string
    phone: string
    goods: OrderItem[]
    user?: User 
}

interface GetOrderData {
    email?: string
    phone?: string
    status?: string
}

interface EditOrderData {
    id: number
    status?: string
}

export class OrderService {

    getMany(getData: GetOrderData) {
        const {email, phone, status} = getData
       
        return repo.find({
            where: {
                email,
                phone,
                status
            },
        })
    }

    create(createOrderData: CreateOrderData) {
        const order = new Order()
        Object.assign(order, createOrderData)
        return repo.save(order)
    }

    async edit(editData: EditOrderData){
        const {id, status} = editData
        const order = await repo.findOneBy({id})
        if(status && order){
            order.status = status
            return repo.save(order)
        } 
    }

    delete(id: number) {
        return repo.delete(id)
    }
}

export const orderService = new OrderService()