import { IsEmail, IsIn, IsPhoneNumber, IsString } from "class-validator"


export class GetOrderDto {

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @IsPhoneNumber('UA')
    phone: string

    @IsString()
    @IsIn(['new', 'completed', 'inProgress', 'refused', 'waited'])
    status: string
}