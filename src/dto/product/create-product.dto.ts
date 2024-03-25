import { IsArray, IsDefined, IsNotEmpty, IsNumber, IsString, Length, ValidateIf, ValidateNested } from "class-validator"
import { CreateCharacteristicsDto } from "../characteristic/create-characteristics.dto.js"
import { Transform, Type, plainToClass } from "class-transformer"


export class CreateProductDto {
    @IsDefined({message: "Заголовок обов'язковий для заповнення"})
    @IsString()
    @IsNotEmpty({
        message: "Заголовок продукту обов'язковий"
    })
    @Length(5,20, {
        message: 'Заголовок повинен бути довше ніж $constraint1 символів та менше ніж $constraint2'
    })
    @Transform(({value}) => {if(typeof value === 'string') return value.trim()})
    title: string

    @IsDefined({message: "Назва продукту обов'язкова для заповнення"})
    @IsString()
    @IsNotEmpty({
        message: "Назва продукту обов'язковий"
    })
    @Length(2,20, {
        message: 'Назва повинна бути довше ніж $constraint1 символів та менше ніж $constraint2'
    })
    @Transform(({value}) => {if(typeof value === 'string') return value.trim().toLowerCase()})
    name: string

    @IsDefined({message: "Модель продукту обов'язкова для заповнення"})
    @IsString()
    @IsNotEmpty({
        message: "Модель продукту обов'язковий"
    })
    @Length(5,20, {
        message: 'Модель повинна бути довше ніж $constraint1 символів та менше ніж $constraint2'
    })
    @Transform(({value}) => {if(typeof value === 'string') return value.trim()})
    model: string

    @IsString()
    @Transform(({value}) => {if(typeof value === 'string') return value.trim()})
    discription?: string

    @IsDefined({message: "Статус обов'язковий для заповнення"})
    @IsString()
    @IsNotEmpty({
        message: "Статус продукту обов'язковий"
    })
    @Length(5,20, {
        message: 'Статус повиннен бути довше ніж $constraint1 символів та менше ніж $constraint2'
    })
    @Transform(({value}) => {if(typeof value === 'string') return value.trim().toLowerCase()})
    status: string

    
    @IsDefined({message: "вибір категорії обов'язковий"})
    @IsNumber()
    @Transform(({value}) => value ? +value : null)
    categoryId: number

    @IsNumber()
    @Transform(({value}) => value ? +value : null)
    @ValidateIf((o) => o.categoryId)
    labelId?: number
   
    @IsNumber()
    @IsDefined({
        message: "Вибір бренду обов'язковий"
    })
    @Transform(({value}) => value ? +value : null )
    brandId: number

    @IsNumber()
    @IsDefined({ message: "Ціна обов'язкова для заповнення" })
    @Transform(({value}) => value ? +value : null )
    price: number

    @ValidateNested()
    @IsArray()
    @Transform(({value}) => {
        if(typeof value === 'string'){
            const parce = JSON.parse(value)
            return plainToClass(CreateCharacteristicsDto, parce)
        }
    })
    characteristics?: CreateCharacteristicsDto[]
}



