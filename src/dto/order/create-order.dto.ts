import { CreateOrderItemDto } from "../order-item/create-order-item.dto.js"

export class CreateOrderDto {
    firstName: string
    lastName: string
    phone: string
    email: string
    goods: CreateOrderItemDto[]
}