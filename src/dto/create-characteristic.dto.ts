import { IsNotEmpty, IsString } from "class-validator"
import {  Transform } from "class-transformer"


export class CreateCharacteristicDto {
    @IsNotEmpty()
    @IsString()
    @Transform(({value})=>value.toLowerCase())
    name: string

    @IsNotEmpty()
    @IsString()
    @Transform(({value})=>value.toLowerCase())
    value: string

    @IsString()
    @Transform(({value})=>value.toLowerCase())
    unit: string
}

