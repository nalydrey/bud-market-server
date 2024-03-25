import { ArrayNotEmpty, IsArray, IsDefined, IsEmail, IsIn, IsMobilePhone, IsPhoneNumber, IsString, Length, ValidateNested } from "class-validator"
import { CreateOrderItemDto } from "../order-item/create-order-item.dto.js"
import { Type } from "class-transformer"

export class CreateOrderDto {
    @IsString()
    @IsDefined()
    @Length(3, 20, {
        message: "Ім'я повинно бути не коротше ніж $constraint1 та не довше ніж $constraint2",
    })
    firstName: string

    @IsString()
    @IsDefined()
    @Length(3, 20, {
        message: "Прізвище повинно бути не коротше ніж $constraint1 та не довше ніж $constraint2",
    })
    lastName: string

    @IsString()
    @IsDefined()
    @IsPhoneNumber('UA',{
        message: "Поле телефон повинно відповідати формату телефон +38-097-000-00-00",
    })
    phone: string

    @IsString()
    @IsDefined()
    @IsEmail({}, {message: 'Email повинен бути в форматі email'})
    email: string

    @ValidateNested()
    @IsArray()
    @ArrayNotEmpty({
        message: 'Замовлення повинно мати хочаб один товар'
    })
    @Type(() => CreateOrderItemDto)
    goods: CreateOrderItemDto[]
}