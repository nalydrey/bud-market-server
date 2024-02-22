import { CreateCharacteristicsDto } from "../characteristic/create-characteristics.dto.js"
import { CreatePhotoDto } from "../photo/create-photo.dto.js"


export class CreateProductDto {
    title: string
    name: string
    model: string
    discription: string
    status: string
    categoryId: number
    labelId: number
    brandId: number
    price: number
    images: number[]
    characteristics: CreateCharacteristicsDto[]
}



