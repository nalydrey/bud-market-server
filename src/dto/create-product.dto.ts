import { Product } from "../entity/product.entity.js"
import { CreateCharacteristicDto } from "./create-characteristic.dto.js"
import {IsString, IsNotEmpty, ValidateNested} from 'class-validator'
import {Transform, Type} from 'class-transformer'

type ProductFields = Pick<Product,'name' | 'discription' | 'type' | 'category' >

export class CreateProductDto implements ProductFields  {
  
    @IsString()
    @IsNotEmpty()
    @Transform(({value}) => value.toLowerCase())
    name: string

    @IsString()
    @IsNotEmpty()
    discription: string

    @IsString()
    @IsNotEmpty()
    @Transform(({value}) => value.toLowerCase())
    category: string
    
    @IsString()
    @IsNotEmpty()
    @Transform(({value}) => value.toLowerCase())
    type: string
  
    @ValidateNested()
    @Type(() => CreateCharacteristicDto)
    characteristics: CreateCharacteristicDto[]
}



