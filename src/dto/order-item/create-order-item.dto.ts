import { IsNumber } from "class-validator"

export class CreateOrderItemDto {
    @IsNumber()
    productId: number
    
    @IsNumber()
    qty: number
}