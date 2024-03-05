import { myDataSource } from "../data-source/data-source.init.js";
import { CreateOrderItemDto } from "../dto/order-item/create-order-item.dto.js";
import { OrderItem } from "../entity/order-item.entity.js";
import { ProductService, productService } from "./product.service.js";

const repo = myDataSource.getRepository(OrderItem)

export class OrderItemService {

    constructor(private productService: ProductService){}

    async create(createDto: CreateOrderItemDto){
        const { productId, qty } = createDto
        const newItem = new OrderItem()
        const product = await this.productService.getOne(productId)
        if (product){
            newItem.product = product
            newItem.qty = qty
            return repo.save(newItem)
        } 
    }
}

export const orderItemService = new OrderItemService(productService)